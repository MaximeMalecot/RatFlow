import { IsString } from "class-validator";

export class CreateAppDto {
    @IsString()
    public name: string;
}
