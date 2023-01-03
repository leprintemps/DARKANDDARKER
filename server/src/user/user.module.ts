import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";

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
    imports: [
        MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]), 
        // session을 사용하지 않을 예정이기 때문에 false
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        // jwt 생성할 때 사용할 시크릿 키와 만료일자 적어주기
        JwtModule.register({
            secret: "23r92d9j29d30j29j23i9f",
            signOptions: { expiresIn: "10h" },
        }),
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService],
})
export class UserModule {}