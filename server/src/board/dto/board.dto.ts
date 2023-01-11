import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber, IsOptional, IsEmpty } from "class-validator";
import { Post, postField } from "../../schema/post.schema";

/***
 * DTO(Data Transfer Object)
 * 데이터전송객체
 * 데이터를 만들기 위한 정보 나열
 * 요상한 데이터 들어오는거 방지
 * class-validator
 * https://github.com/typestack/class-validator
 */
export class CreatePostDto implements postField{
    
    @IsString()
    readonly title: string;
    @IsString()
    readonly body: string;
    @IsString()
    readonly author: string;
    @IsString({each:true})
    @IsOptional()
    comments: Post[];
    
    createdAt: Date;
    updatedAt: Date;
}

export class UpdatePostDto extends PartialType(CreatePostDto){}