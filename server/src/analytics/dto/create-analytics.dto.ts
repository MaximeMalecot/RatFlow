import { IsDate, IsString } from "class-validator";

export class CreateAnalyticsDto {
    @IsString()
    public url: string;
    @IsDate()
    public date: string;
}
