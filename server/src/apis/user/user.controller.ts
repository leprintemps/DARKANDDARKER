import { CreateUserDto } from './../../dto/user.dto';
import { UserService } from './user.service';
import { RtGuard } from '../../common/guards/rt.guard';
import { Body, Controller, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator';
import { GetCurrentRt } from 'src/common/decorators/get-current-rt.decorator';

@Controller("user")
export class UserController {

    constructor(
        private userService: UserService,
    ){}

    // 로컬 회원가입
    @Public()
    @Post("signup")
    async signup(@Body() userDto: CreateUserDto) : Promise<any> {
        this.userService.signup(userDto);
    }

    // 로컬 로그인
    @Public()
    @Post("signin")
    async signin(@Body() body, @Res({passthrough:true}) response: Response): Promise<any> {
        const { _id, username, name, email, location, access_token, refresh_token } = await this.userService.signin(body.username, body.password);

        response.cookie("access_token", access_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day
        response.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day
        
        return { 
            _id,
            username,
            name,
            email,
            location,
        };
    }

    // 로그아웃
    @Post("signout")
    async signout(@GetCurrentUserId() _id: string, @Res({passthrough:true}) response: Response): Promise<any> {

        response.clearCookie("access_token", {httpOnly: true});
        response.clearCookie("refresh_token", {httpOnly: true});

        this.userService.signout(_id);
    }

    // refresh 토큰 재생성
    @Public()
    @UseGuards(RtGuard)
    @Post("refresh")
    async refreshToken(
        @GetCurrentUserId() _id: string,
        @GetCurrentRt() rt: string,
        @Res({passthrough:true}) response: Response 
    ) : Promise<any>{
        const { access_token, refresh_token } = await this.userService.refreshToken(_id, rt);

        response.cookie("access_token", access_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day
        response.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day
    }

    // 메일 인증
    @Post("email-verify")
    async verifyEmail(@Query() verifyToken: string) : Promise<any> {
        return await this.userService.verifyEmail(verifyToken);
    }

    // 비밀번호 초기화
    @Post("reset-password")
    async resetPasswrod(@Body() email: string) : Promise<any> {
        return await this.userService.resetPassword(email);
    }

}