import { CreateBoardDto } from './../../dto/board.dto';
import { Board, BoardDocument } from './../../schema/board.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class BoardService {

    constructor(
        @InjectModel(Board.name)
        private boardModel : Model<BoardDocument>,
    ) {}

    // 게시판 목록 조회

    // 게시판 생성
    async createBoard(boardDto : CreateBoardDto) : Promise<any> {
        this.boardModel.create({
            ...boardDto
        });
    }

    // 게시판 수정

    // 게시판 삭제

}