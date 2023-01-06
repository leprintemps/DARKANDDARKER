import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type Payload = {
    sub: string;
    username: string;
}

/*
    access token strategy
*/
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    let token = "";
                    if ( req && req.cookies ) {
                        token = req.cookies["access_token"];
                    }
                    return token;
                } 
            ]),
            ignoreExpiration: false, // default false
            secretOrKey: "access_token_key",
        })
    }

    async validate(payload: Payload) {
        return payload;
    }
}