import { CreateUserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { IsObjectId } from '../common/decorators/is-object-id.decorator';

export class CreateManagerDto {

    @IsObjectId()
    user: CreateUserDto;

    @IsBoolean()
    isEditable: boolean;

}

export class UpdateManagerDto extends PartialType(CreateManagerDto){}