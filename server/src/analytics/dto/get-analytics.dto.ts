import { IsOptional, IsString } from "class-validator";

export class GetAnalyticsDto {
    @IsString()
    @IsOptional()
    public clientId?: string;
    @IsString()
    @IsOptional()
    public sessionId?: string;
    @IsString()
    @IsOptional()
    public service?: string;
    @IsString()
    @IsOptional()
    public eventName: string;
    @IsString()
    @IsOptional()
    public url: string;
    @IsString()
    @IsOptional()
    public userAgent?: string;
    @IsString()
    @IsOptional()
    public ip?: string;
    @IsString()
    @IsOptional()
    public tagId?: string;
}
