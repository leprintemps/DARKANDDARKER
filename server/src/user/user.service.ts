import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
    ) {}
    
    // 유저 조회
    async getUser(username: string): Promise<User> {
        return await this.userModel.findOne({ username });
    }
    
    // 유저 회원가입
    async joinUser(userData: CreateUserDto) : Promise<User> {
        // 비밀번호 암호화
        const hashedPassword = bcrypt.hashSync(userData.password, 10);

        return await this.userModel.create({
            ...userData,
            password: hashedPassword,
        });
    }

    // 유저 로그아웃
    async logoutUser(username: string) : Promise<void> {
    }

    // 유저 탈퇴
    async removeUser(username: string) : Promise<void> {
        return await this.userModel.remove({username});
    }

}