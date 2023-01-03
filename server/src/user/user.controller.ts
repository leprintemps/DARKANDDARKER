import { JwtAuthGuard } from './../auth/jwt.guard';
import { LocalAuthGuard } from './../auth/local.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schema/user.schema';
import { Controller, Get, UseGuards, Param, Post, Body, Request } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
// import { AuthService } from 'src/auth/auth.service';

@Controller("user")
export class UserController {

    constructor(
        private userService: UserService,
    ){}

    // 유저 정보 조회
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    login(@Request() req) {
        return this.userService.login(req.user);
    }
    
    // 유저 로그아웃

    // 유저 탈퇴
}