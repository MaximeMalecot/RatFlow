import {
    IsArray,
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
} from "class-validator";

export class UnrestrictedCreateUserDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    @IsStrongPassword()
    public password: string;

    @IsOptional()
    @IsArray()
    public roles?: string[];
}
