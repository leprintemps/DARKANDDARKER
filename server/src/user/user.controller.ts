import { User } from './schema/user.schema';
import { Controller, Get } from "@nestjs/common";
import { UserService } from './user.service';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService){}

    // 유저 정보 조회
    @Get("/:username")
    getUser(@Param("username") username: string) : Promise<User> {
        return this.userService.getUser(username);
    }

    // 유저 회원가입
    @Post("/join")
    joinUser(@Body() userData: CreateUserDto) : Promise<User> {
        return this.userService.joinUser(userData);
    }

    // 유저 로그인
    
    // 유저 로그아웃

    // 유저 탈퇴
}