import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { Board } from './entities/board.entity';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    getAll(): Board[];
    search(title: number): string;
    getOne(id: number): Board;
    create(boardData: CreateBoardDto): boolean;
    remove(boardId: number): void;
    put(boardId: number): string;
    patch(boardId: number, updateData: UpdateBoardDto): void;
}
