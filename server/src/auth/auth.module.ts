import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from './../user/schema/user.schema';
import { LocalStrategy } from './local.strategy';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]), 
        PassportModule,
        JwtModule.register({
            secret: "348f394fj23dj2d",
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [
        AuthService, 
        LocalStrategy,
        JwtStrategy
    ],
    exports: [AuthService],
})
export class AuthModule {}