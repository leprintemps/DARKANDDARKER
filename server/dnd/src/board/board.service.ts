import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UpdateBoardDto } from './dto/board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
    private boards: Board[] = [];

    getAll(): Board[] {
        return this.boards;
    }

    getOne(id:number): Board {
        const board = this.boards.find(board => board.id === id);
        if(!board){
            throw new NotFoundException(`Board ID : ${id} not found.`);
        }
        return board;
    }
    deleteOne(id:number){
        this.getOne(id);
        this.boards = this.boards.filter(board => board.id !== id);
    }
    create(boardData): boolean{
        this.boards.push({
            id:this.boards.length+1,
            date:new Date(),
            comment:[],
            ...boardData
        });
        return true;
    }

    update(id:number, updateData: UpdateBoardDto){
        const board = this.getOne(id);
        this.deleteOne(id);
        this.boards.push({...board,...updateData});

    }
}
