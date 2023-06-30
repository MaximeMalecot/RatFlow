import { IsEnum, IsOptional } from "class-validator";

export class SessionPeriodQueryDto {
    @IsOptional()
    @IsEnum(["day", "month", "year"], {
        message: "scale must be day, month or year",
    })
    scale?: string = "day";
}
