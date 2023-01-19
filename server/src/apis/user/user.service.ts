import { BlogService } from './../blog/blog.service';
import { CreateUserDto } from './../../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../../schema/user.schema';
import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";
import type { Tokens } from "../../types/tokens.type";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    // 가입
    async signup(userDto: CreateUserDto): Promise<any> {

        // 비밀번호 암호화
        const hashedPassword = await this._hash(userDto.password);

        // 새로운 유저 정보를 DB에 추가
        await this.userModel.create({
            ...userDto,
            password: hashedPassword,
        });
    }

    // 로그인
    async signin(username: string, password : string): Promise<any> {
        const user = await this.userModel.findOne({ username });

        // 존재하는 아이디인지 확인
        if ( !user ) {
            throw new HttpException("username does not exists.", HttpStatus.UNAUTHORIZED);
        }
        
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        
        // 비밀번호 확인
        if ( !isPasswordMatched ) {
            throw new HttpException("password not matched.", HttpStatus.UNAUTHORIZED);
        }

        // 토큰을 생성하고 refresh token은 암호화하여 DB에 저장.
        const tokens = await this._generateTokens(user._id.toString(), user.username);
        await this._updateRtHash(user._id.toString(), tokens.refresh_token);

        return {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            location: user.location,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        };
    }

    // 로그아웃
    async signout(_id: string) : Promise<any> {
        // user DB에 hashedRt를 null로 업데이트
        await this.userModel.findByIdAndUpdate(_id, { hashedRt: null })
    }

    // refresh 토큰 재생성
    async refreshToken(_id: string, rt: string) : Promise<any> {
        const user = await this.userModel.findById({ _id });

        if ( !user || !user.hashedRt ) {
            throw new HttpException("Access denied.", HttpStatus.UNAUTHORIZED);
        }
        
        const isRtMatches = await bcrypt.compare(rt, user.hashedRt);
        
        // DB에 있는 암호화된 refresh token과 클라이언트가 요청한 refresh token이 일치하는지 검사
        if ( !isRtMatches ) {
            throw new HttpException("Access denied.", HttpStatus.UNAUTHORIZED);
        }

        // 토큰을 생성하고 refresh token은 암호화하여 DB에 저장.
        const tokens = await this._generateTokens(user._id.toString(), user.username);
        await this._updateRtHash(user._id.toString(), tokens.refresh_token);

        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        };
    }

    // 데이터를 암호화 한다.
    async _hash(data: string) : Promise<any> {
        return await bcrypt.hash(data, 10);
    }

    // access token 과 refresh token을 생성한다.
    async _generateTokens(_id: string, username: string): Promise<any> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: _id,
                    username,
                }, 
                {
                    secret:"access_token_key",
                    expiresIn: 60 * 15, // 15 minutes
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: _id,
                    username,
                }, 
                {
                    secret:"refresh_token_key",
                    expiresIn: 60 * 60 * 24 * 7, // 1 week
                },
            ),
        ]);

        return {
            access_token : at,
            refresh_token: rt,
        }
    }
    
    // refresh token을 암호화 한다.
    async _updateRtHash(_id: string, rt: string) {
        
        const hash = await this._hash(rt);

        await this.userModel.findByIdAndUpdate(_id, {hashedRt: hash});
    }
    
}