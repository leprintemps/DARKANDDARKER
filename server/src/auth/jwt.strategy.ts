import { User } from '../user/schema/user.schema';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";

/*
    guard의 전략을 담은 코드로 validate함수가 실행되면서 인증절차를 거치게 된다.
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 헤더 Authentication 에서 Bearer 토큰으로부터 jwt를 추출하겠다는 의미
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwt 생성시 비밀키로 사용할 텍스트 (노출 X)
            secretOrKey: "23r92d9j29d30j29j23i9f",	
            // jwt 만료를 무시할 것인지 (기본값: false)
            ignoreExpiration: false,  
        })
    }

    async validate(payload: any) {
        console.log(payload)
        return { payload }
    }
}