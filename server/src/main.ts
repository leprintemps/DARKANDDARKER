import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/***
 * 시작점
 * AppModule 인자로 Nest생성
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /***
   * 파이프
   * 미들웨어같은 존재
   * class 유효성검사등에 사용
   */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted : true,
    transform:true,
  }));
  await app.listen(8080);
}
bootstrap();
