import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";

@Module({
    imports: [MongooseModule.forFeature([{ name:User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [],
})
export class UserModule {}