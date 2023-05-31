import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    public skip: number = 0;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    public limit: number = 10;
}
