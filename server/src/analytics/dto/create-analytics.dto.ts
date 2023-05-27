import { IsDate, IsObject, IsOptional, IsString } from "class-validator";

export class CreateAnalyticsDto {
    @IsString()
    public appId: string;
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
    public eventName: string;
    @IsString()
    public url: string;
    @IsString()
    @IsOptional()
    public userAgent?: string;
    @IsString()
    @IsOptional()
    public ip?: string;
    @IsDate()
    public date: string;
    @IsObject()
    @IsOptional()
    public customData?: string;
    @IsString()
    @IsOptional()
    public tagId?: string;
}
