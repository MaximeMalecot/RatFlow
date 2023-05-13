export declare class CreatePostRequestDto {
    content: string;
    providerId: string;
    filterId?: string;
}
export declare class CreatePostDto extends CreatePostRequestDto {
    userId: string;
}
