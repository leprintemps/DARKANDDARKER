import { MailService } from './../mail/mail.service';
import { UserService } from './user.service';
import { User, UserSchema } from '../../schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { RtStrategy } from '../../common/strategies/rt.strategy';
import { AtStrategy } from '../../common/strategies/at.strategy';
import { UserController } from './user.controller';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({})
    ],
    controllers: [UserController],
    providers: [UserService, AtStrategy, RtStrategy, MailService],
})
export class UserModule {};