import { userField } from './../schema/user.schema';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from "class-validator";

export class CreateUserDto implements userField{

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly location: string;

    @IsString()
    @IsOptional()
    readonly token: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){};