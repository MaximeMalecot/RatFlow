import { IsDateString, IsObject, IsOptional, IsString } from "class-validator";

export class CreateAnalyticsDto {
    @IsString()
    @IsOptional()
    public appId?: string;
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
    @IsDateString()
    public date: string;
    @IsObject()
    @IsOptional()
    public customData?: Object;
    @IsString()
    @IsOptional()
    public tagId?: string;
}
