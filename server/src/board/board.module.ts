import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board, BoardSchema } from './schema/board.schema';

@Module({
    //.name은 함수나 클래스등의 이름을 반환하는 읽기전용 프로퍼티 'Board'와 동일
    imports: [MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }])],
    controllers: [BoardController],
    providers: [BoardService],
    // 외부에서 쓰고 싶으면 씀
    exports: [BoardService],
})
export class BoardModule {}
