import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class GetSessionStatsDto {
    @Type(() => Date)
    @IsDate()
    date: Date;
}
