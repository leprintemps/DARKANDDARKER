import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

/*
    refresh token strategy
*/
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    let token = "";
                    if ( req && req.cookies ) {
                        token = req.cookies["refresh_token"];
                    }
                    return token;
                } 
            ]),
            ignoreExpiration: false, // default false
            secretOrKey: "refresh_token_key",
            passReqToCallback: true, // 콜백함수에 request 객체를 넘겨주는 옵션
        })
    }

    /*
        refresh token 검증 후 이상이 없다면 refresh token을 이용하여 token을 재발급해야 하기 때문에
        refresh token을 반환한다.
    */
    async validate(request: Request, payload: any) {
        const rt = request.cookies["refresh_token"];
        return {...payload, rt};
    }

}