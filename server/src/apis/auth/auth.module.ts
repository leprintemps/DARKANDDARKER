import { User, UserSchema } from '../../schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { RtStrategy } from '../../common/strategies/rt.strategy';
import { AtStrategy } from '../../common/strategies/at.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {};