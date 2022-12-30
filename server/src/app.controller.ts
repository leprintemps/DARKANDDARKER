import { Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/***
 * Controller
 * express의 라우터 같은 존재
 * url가져오고 함수 실행
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/hello")
  sayHello(): string{
    return this.appService.getHi();
  }
  

  @Post("/hello2")
  sayHello2(): string{
    return '안녕';
  }
}
