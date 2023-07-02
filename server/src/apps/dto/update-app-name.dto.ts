import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateAppNameDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}
