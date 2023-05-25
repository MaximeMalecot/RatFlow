import {
    IsNotEmpty,
    IsOptional,
    IsStrongPassword,
} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsStrongPassword()
    oldPassword: string;

    @IsOptional()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
