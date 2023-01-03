import { User } from './../user/schema/user.schema';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";

/*
    로그인 Strategy
*/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService,
    ){
        super({
            usernameField: "username",
            passwordField: "password"
        })
    }

    async validate(username: string, password: string): Promise<User> {
        console.log("LocalStrategy - validate")
        const user = await this.authService.validateUser(username, password);

        if ( !user ) {
            throw new UnauthorizedException();
        }
        
        return user;
    }
}