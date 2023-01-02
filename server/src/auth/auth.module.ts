// import { JwtModule } from '@nestjs/jwt';
// import { Module } from '@nestjs/common';
// import { UserModule } from './../user/user.module';
// import { AuthService } from "./auth.service";
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';
// import { JwtStategy } from './jwt.strategy';

// @Module({
//     imports: [
//         UserModule, 
//         PassportModule,
//         JwtModule.register({
//             secret: "12dji203dnsdk",
//             signOptions: { expiresIn: 3600 },
//         })
//     ],
//     providers: [AuthService, LocalStrategy, JwtStategy],
// })

// export class AuthModule {}