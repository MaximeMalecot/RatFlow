import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}
