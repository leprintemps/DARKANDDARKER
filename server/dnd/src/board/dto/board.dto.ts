import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber, IsOptional } from "class-validator";

/***
 * DTO(Data Transfer Object)
 * 데이터전송객체
 * 데이터를 만들기 위한 정보 나열
 * 요상한 데이터 들어오는거 방지
 * class-validator
 * https://github.com/typestack/class-validator
 */
export class CreateBoardDto{

    @IsString()
    readonly title: string;
    @IsString()
    readonly body: string;
    @IsString({each:true})
    @IsOptional()
    readonly comment: string[];
}

export class UpdateBoardDto extends PartialType(CreateBoardDto){}