import { CreateManagerDto } from './manager.dto';
import { CreateBoardDto } from './board.dto';
import { CreateUserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IsObjectId } from '../common/decorators/is-object-id.decorator';

export class CreateBlogDto {

    @IsOptional()
    @IsObjectId()
    _id: string;

    @IsBoolean()
    isPublic: boolean;

    @IsString()
    name: string;

    @IsString()
    description: string;
    
    @IsObjectId()
    owner: CreateUserDto;
    
    @IsOptional()
    @IsObjectId({each:true})
    boards: CreateBoardDto[];

    @IsOptional()
    @IsObjectId({each:true})
    managers: CreateManagerDto[];

}

export class UpdateBlogDto extends PartialType(CreateBlogDto){}