// import { User } from './../user/schema/user.schema';
// import { UserService } from './../user/user.service';
// import { Injectable } from "@nestjs/common";
// import { compare } from "bcrypt";
// import { JwtService } from "@nestjs/jwt";

// @Injectable()
// export class AuthService {
//     constructor(
//         private userService: UserService,
//         private jwtService: JwtService,
//     ) {}

//     async validateUser(username: string, password: string): Promise<User> {
//         const user = await this.userService.getUser(username);

//         // username이 존재하지 않거나 비밀번호가 일치하지 않다면
//         if ( !user || ( user && !compare(password, user.password) ) ) {
//             return null;
//         }
        
//         return user;
//     }

//     async login(username: string, password: string) {
//         const payload = { username };
//         return { accessToken : this.jwtService.sign(payload) };
//     }
// }