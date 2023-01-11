import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber, IsOptional, IsEmpty } from "class-validator";
import { IsObjectId } from "src/common/decorators/is-object-id.decorator";
import { Post, postField } from "../schema/post.schema";
import { CreateCommentDto } from "./comment.dto";

/***
 * DTO(Data Transfer Object)
 * 데이터전송객체
 * 데이터를 만들기 위한 정보 나열
 * 요상한 데이터 들어오는거 방지
 * class-validator
 * https://github.com/typestack/class-validator
 */
export class CreatePostDto {
    
    @IsString()
    title: string;
    @IsString()
    body: string;
    @IsString()
    author: string;
    @IsObjectId({each:true})
    @IsOptional()
    comments: CreateCommentDto[];
    
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export class UpdatePostDto extends PartialType(CreatePostDto){}