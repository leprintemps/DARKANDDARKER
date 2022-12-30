import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board, BoardSchema } from './schema/board.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }])],
    controllers: [BoardController],
    providers: [BoardService],
    // 외부에서 쓰고 싶으면 씀
    exports: [BoardService],
})
export class BoardModule {}
