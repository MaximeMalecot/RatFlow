import { IsString } from "class-validator";

export class LinkUserWithAppDto {
    @IsString()
    public userId: string;

    @IsString()
    public appId: string;
}
