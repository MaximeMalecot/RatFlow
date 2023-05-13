import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostRequestDto {
  @IsString()
  content: string;

  @IsUUID()
  providerId: string;

  @IsOptional()
  filterId?: string;
}

export class CreatePostDto extends CreatePostRequestDto {
  @IsUUID()
  userId: string;
}
