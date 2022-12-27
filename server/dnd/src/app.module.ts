import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';

/***
 * AppModule
 * 모든것의 루트 모듈
 * 
 */
@Module({
  imports: [BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
