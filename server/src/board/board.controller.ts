import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { Board } from './schema/board.schema';

/***
 * Controller
 * express의 라우터 같은 존재
 * url가져오고 함수 실행
 */

@Controller('/api/board')
export class BoardController {

    constructor(private readonly boardService: BoardService){}
    @Get()
    async getAll(): Promise<Board[]>{
        return this.boardService.getAll();
    }

    @Get("Search")
    async search(@Query("title") title: string ): Promise<Board[]>{
        return this.boardService.search(title);
    }

    @Get("/:id")
    async getOne(@Param('id') id: string): Promise<Board> {
        return this.boardService.getOne(id);
    }
    @Post()
    async create(@Body() boardData: CreateBoardDto): Promise<Board>{
        const result = this.boardService.create(boardData);
        console.log(result);
        return result;
    }
    
    @Delete("/:id")
    async remove(@Param('id') boardId: string): Promise<Board> {
        return this.boardService.deleteOne(boardId); 
    }

    @Put('/:id')
    async put(@Param('id') boardId: string) {
        return `put board : ${boardId}`; 
    }

    @Patch('/:id')
    async patch(@Param('id') boardId: string, @Body() updateData: UpdateBoardDto): Promise<Board> {
        return this.boardService.update(boardId, updateData);
        
    }
    
    
}
