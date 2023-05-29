import { IsEmail, IsString } from "class-validator";

export class LinkMailWithAppDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    public appId: string;
}
