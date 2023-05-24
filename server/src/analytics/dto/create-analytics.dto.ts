import { IsString } from "class-validator";

export class CreateAnalyticsDto {
    @IsString()
    public name: string;
}