"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
let BoardService = class BoardService {
    constructor() {
        this.boards = [];
    }
    getAll() {
        return this.boards;
    }
    getOne(id) {
        const board = this.boards.find(board => board.id === id);
        if (!board) {
            throw new exceptions_1.NotFoundException(`Board ID : ${id} not found.`);
        }
        return board;
    }
    deleteOne(id) {
        this.getOne(id);
        this.boards = this.boards.filter(board => board.id !== id);
    }
    create(boardData) {
        this.boards.push(Object.assign({ id: this.boards.length + 1, date: new Date(), comment: [] }, boardData));
        return true;
    }
    update(id, updateData) {
        const board = this.getOne(id);
        this.deleteOne(id);
        this.boards.push(Object.assign(Object.assign({}, board), updateData));
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)()
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map