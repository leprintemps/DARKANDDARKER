import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber, IsOptional, IsEmpty } from "class-validator";
import mongoose from "mongoose";
import { IsObjectId } from "src/common/decorators/is-object-id.decorator";

export class CreateCommentDto{
    
    @IsObjectId()
    user: mongoose.Schema.Types.ObjectId;

    @IsString()
    contents: string;

    @IsObjectId()
    parent: mongoose.Schema.Types.ObjectId;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto){}