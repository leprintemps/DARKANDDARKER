import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { Board } from './schema/board.schema';

/***
 * Controller
 * express의 라우터 같은 존재
 * url가져오고 함수 실행
 */

@Controller('board')
export class BoardController {

    constructor(private readonly boardService: BoardService){}
    
    @Public()
    @Get()
    async getAll(): Promise<Board[]>{
        const Boards = this.boardService.getAll();
        return Boards;
    }

    @Public()
    @Get("Search")
    async search(@Query("title") title: string ){
        return `board search : ${title}`
    }

    @Public()
    @Get("/:id")
    async etOne(@Param('id') id: string): Promise<Board> {
        return this.boardService.getOne(id);
    }

    @Public()
    @Post()
    async create(@Body() boardData: CreateBoardDto): Promise<Board>{
        return this.boardService.create(boardData);
    }
    
    @Public()
    @Delete("/:id")
    async remove(@Param('id') boardId: string) {
        return this.boardService.deleteOne(boardId); 
    }

    @Public()
    @Put('/:id')
    async put(@Param('id') boardId: string) {
        return `put board : ${boardId}`; 
    }

    @Public()
    @Patch('/:id')
    async patch(@Param('id') boardId: string, @Body() updateData: UpdateBoardDto): Promise<Board> {
        return this.boardService.update(boardId, updateData);
        
    }
    
    
}
