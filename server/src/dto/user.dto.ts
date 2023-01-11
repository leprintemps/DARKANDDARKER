import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {

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
    readonly hashedRt: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){};