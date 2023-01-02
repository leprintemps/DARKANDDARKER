// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from "@nestjs/common";

// 쿠키로 부터 토큰을 가져온다.
// const fromAuthCookie = (request : any) => {
//     let token = null;
//     if ( request && request.cookies ) {
//         token = request.cookies["Authorization"];
//     }
//     return token;
// }

// @Injectable()
// export class JwtStategy extends PassportStrategy(Strategy) {
//     constructor (
//     ) {
//         super({
//             jwtFromRequest: fromAuthCookie(),
//             ignoreExpiration: false,
//             secretOrKey: "12dji203dnsdk",
//         })
//     }

//     async validate(payload: any) {
//         return { username: payload.username };
//     }
// }