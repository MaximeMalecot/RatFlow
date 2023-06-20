import { IsOptional, IsString } from "class-validator";

export class PageViewDto {
    @IsString()
    @IsOptional()
    url: String = "/";

    @IsString()
    @IsOptional()
    service: string;
}
