import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
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
