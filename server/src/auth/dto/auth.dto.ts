import { IsOptional, IsString } from "class-validator";

export class AuthDto {

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
    
}