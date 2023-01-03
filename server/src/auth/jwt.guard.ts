import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*
    AuthGuard()
    Guard 의 전략을 실행시켜주는 함수가 내장된 라이브러리로 
    Guard 가 실행될 때 jwt.strategy.ts 코드를 실행시켜서 Guard 에 필요한 로직이 실행될 수 있도록 도와준다. 
    (이때 전략은 jwt 방식을 이용해서 요청으로부터 Guard 를 한다.)
*/
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}