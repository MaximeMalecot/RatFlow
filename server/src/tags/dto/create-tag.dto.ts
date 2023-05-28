import { IsString, IsUUID } from "class-validator";

export class CreateTagDto {
    @IsString()
    public name: string;
    @IsUUID()
    public appId: string;
}
