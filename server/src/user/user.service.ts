import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    // 유저 조회
    async getUser(username: string): Promise<User> {
        return await this.userModel.findOne({ username });
    }
    
    // 유저 회원가입
    async joinUser(userData: CreateUserDto) : Promise<User> {
        return await this.userModel.create(userData);
    }

    // 유저 로그인
    async loginUser(username: string, password: string) : Promise<void> {
    }

    // 유저 로그아웃
    async logoutUser(username: string) : Promise<void> {
    }

    // 유저 탈퇴
    async removeUser(username: string) : Promise<void> {
        return await this.userModel.remove({username});
    }

}