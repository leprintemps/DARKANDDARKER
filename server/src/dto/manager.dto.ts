import { CreateUserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { IsObjectId } from '../common/decorators/is-object-id.decorator';

export class CreateManagerDto {

    @IsObjectId()
    user: CreateUserDto;

    @IsBoolean()
    isEditable: boolean;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

}

export class UpdateManagerDto extends PartialType(CreateManagerDto){}