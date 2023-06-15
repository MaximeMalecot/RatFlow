import { IsArray } from "class-validator";

export class UpdateAppOriginsDto {
    @IsArray()
    origins: string[];
}
