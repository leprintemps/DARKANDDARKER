import { User, UserSchema } from '../schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

/*
    imports:
        해당 모듈에서 필요한 모듈들의 모든 집합
    controllers:
        인스턴스화 해야하는 이 모듈에 정의된 컨트롤러 세트
    providers:
        nest 인젝터에 의해 인스턴스화 되고 최소 이 모듈에서 공유될 수 있는 provider
    exports:
        이 모듈에서 제공할 집합이며, 이 모듈을 가져오는 다른 모듈에서 사용할 수 있도록 노출할 provider 
*/
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [],
})
export class UserModule {}