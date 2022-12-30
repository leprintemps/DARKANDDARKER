import { UpdateBoardDto } from './dto/board.dto';
import { Board } from './entities/board.entity';
export declare class BoardService {
    private boards;
    getAll(): Board[];
    getOne(id: number): Board;
    deleteOne(id: number): void;
    create(boardData: any): boolean;
    update(id: number, updateData: UpdateBoardDto): void;
}
