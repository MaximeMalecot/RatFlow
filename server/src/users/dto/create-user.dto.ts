import {
    IsEmail,
    IsString,
    IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    @IsStrongPassword()
    public password: string;
}
