import { CreatePostDto } from './post.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { IsObjectId } from '../common/decorators/is-object-id.decorator';

export class CreateBoardDto {

    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    @IsOptional()
    @IsObjectId({ each:true })
    posts: CreatePostDto[];
  
    createdAt: Date;

    updatedAt: Date;
  
    deletedAt: Date;

}

export class UpdateBoardDto extends PartialType(CreateBoardDto){}