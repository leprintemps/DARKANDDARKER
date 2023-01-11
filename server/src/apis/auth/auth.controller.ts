import { ProcessResult } from '../../types/result';
import { RtGuard } from '../../common/guards/rt.guard';
import { AuthDto } from '../../dto/auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { GetCurrentRt, GetCurrentUserId, Public } from '../../common/decorators';
import { Response } from 'express';

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService,
    ){
        
    }

    // 로컬 회원가입
    @Public()
    @Post("local/signup")
    async signupLocal(@Body() authDto: AuthDto) : Promise<ProcessResult> {
        this.authService.signupLocal(authDto);

        return { 
            message: "welcome stranger!",
            isSuccess: true,
        }
    }

    // 로컬 로그인
    @Public()
    @Post("local/signin")
    async signinLocal(@Body() authDto: AuthDto, @Res({passthrough:true}) response: Response): Promise<ProcessResult> {
                
        const { _id, username, access_token, refresh_token } = await this.authService.signinLocal(authDto);

        response.cookie("access_token", access_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day
        response.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day
        
        return { 
            data: { _id, username }, 
            message: `hello, ${username}!`, 
            isSuccess: true,
        };
    }

    // 로그아웃
    @Post("logout")
    async logout(@GetCurrentUserId() _id: string, @Res({passthrough:true}) response: Response): Promise<ProcessResult> {

        response.clearCookie("access_token", {httpOnly: true});
        response.clearCookie("refresh_token", {httpOnly: true});

        this.authService.logout(_id);

        return {
            isSuccess: true,
        }
    }

    // refresh 토큰 재생성
    @Public()
    @UseGuards(RtGuard)
    @Post("refresh")
    async refreshToken(
        @GetCurrentUserId() _id: string,
        @GetCurrentRt() rt: string,
        @Res({passthrough:true}) response: Response 
    ) : Promise<ProcessResult>{

        const { access_token, refresh_token } = await this.authService.refreshToken(_id, rt);

        response.cookie("access_token", access_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day
        response.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day

        return {
            isSuccess: true,
        };
    }

}