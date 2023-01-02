import { User } from './schema/user.schema';
import { Controller, Get, UseGuards, Param, Post, Body, Request } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from 'src/auth/auth.service';

@Controller("user")
export class UserController {

    constructor(
        private userService: UserService,
        // private authService: AuthService,
    ){}

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
    @UseGuards(AuthGuard('local'))
    @Post("/login")
    async login(@Request() req: any){
        return req.user;
    }
    
    // 유저 로그아웃

    // 유저 탈퇴
}