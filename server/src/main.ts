import { TokenExceptionFilter } from './config/filter/token.exception.filter';
import { HttpExceptionFilter } from './config/filter/http.exception.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/***
 * 시작점
 * AppModule 인자로 Nest생성
 */
const options = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  allowedHeaders: 'Content-Type, Accept',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /***
   * 파이프
   * 미들웨어같은 존재
   * class 유효성검사등에 사용
   */
  app.enableCors(options);
  // excpetion filter 전역에서 사용
  app.useGlobalFilters(new HttpExceptionFilter()); 
  app.useGlobalFilters(new TokenExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted : true,
    transform:true,
  }));
  // Reflector ???
  // const reflector = new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector));
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
