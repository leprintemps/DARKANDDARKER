import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './../user/schema/user.schema';
import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    // 유저 검증
    async validateUser(username: string, password: string): Promise<User> {
        console.log("AuthService - validateUser")
        
        const user = await this.userModel.findOne({ username });
    
        if ( !user ) {
            throw new HttpException("username is not exists.", HttpStatus.BAD_REQUEST);
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if ( !isPasswordMatched ) {
            throw new HttpException("password is not matched.", HttpStatus.BAD_REQUEST);
        }
    
        return user;
    }
    
}