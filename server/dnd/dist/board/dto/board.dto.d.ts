export declare class CreateBoardDto {
    readonly title: string;
    readonly body: string;
    readonly comment: string[];
}
declare const UpdateBoardDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBoardDto>>;
export declare class UpdateBoardDto extends UpdateBoardDto_base {
}
export {};
