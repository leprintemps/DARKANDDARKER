import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { Board } from './entities/board.entity';

/***
 * Controller
 * express의 라우터 같은 존재
 * url가져오고 함수 실행
 */

@Controller('board')
export class BoardController {

    constructor(private readonly boardService: BoardService){}
    @Get()
    getAll(): Board[]{
        return this.boardService.getAll();
    }

    @Get("Search")
    search(@Query("title") title: number ){
        return `board search : ${title}`
    }

    @Get("/:id")
    getOne(@Param('id') id: number): Board {
        return this.boardService.getOne(id);
    }
    @Post()
    create(@Body() boardData: CreateBoardDto){
        return this.boardService.create(boardData);
    }
    
    @Delete("/:id")
    remove(@Param('id') boardId: number) {
        return this.boardService.deleteOne(boardId); 
    }

    @Put('/:id')
    put(@Param('id') boardId: number) {
        return `put board : ${boardId}`; 
    }

    @Patch('/:id')
    patch(@Param('id') boardId: number, @Body() updateData: UpdateBoardDto) {
        return this.boardService.update(boardId, updateData);
        
    }
    
    
}
