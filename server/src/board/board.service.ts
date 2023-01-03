import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Model } from 'mongoose';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { Board, BoardDocument } from './schema/board.schema';

@Injectable()
export class BoardService {
    constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>) {}
    
    async getAll(): Promise<Board[]> {
        return await this.boardModel.find().exec();
    }
    
    search(title: string): Promise<Board[]> {
        throw new Error('Method not implemented.');
    }
    async getOne(id:string): Promise<Board> {
        const board = await this.boardModel.findOne({ _id: id }).exec();
        if(!board){
            throw new NotFoundException(`Board ID : ${id} not found.`);
        }
        return board;
    }
    async deleteOne(id:string){
        const board = await this.boardModel.exists({_id:id}).exec();
        if(!board){
            throw new NotFoundException(`Board ID : ${id} not found.`);
        }
        const deletedBoard = await this.boardModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedBoard;
    }
    async create(boardData: CreateBoardDto): Promise<Board> {
        const createdBoard = await this.boardModel.create(boardData);
        return createdBoard;
    }

    async update(id:string, updateData: UpdateBoardDto): Promise<Board> {
        const board = await this.boardModel.exists({ _id: id }).exec();
        if(!board){
            throw new NotFoundException(`Board ID : ${id} not found.`);
        }
        const updateBoard = await this.boardModel.findByIdAndUpdate(id, updateData);
        return updateBoard;

    }
}
