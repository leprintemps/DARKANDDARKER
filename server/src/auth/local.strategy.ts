// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { User } from './../user/schema/user.schema';
// import { AuthService } from './auth.service';
// import { Strategy } from "passport-local";
// import { PassportStrategy } from '@nestjs/passport';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {

//     constructor(
//         private authService: AuthService
//     ) {
//         super();
//     }

//     async validate(username: string, password: string): Promise<User> {
//         const user = await this.authService.validateUser(username, password);
        
//         if ( !user ) {
//             throw new HttpException(
//                 "Password is not matched.",
//                 HttpStatus.BAD_REQUEST,
//             )
//         }

//         return user;
//     }
// }