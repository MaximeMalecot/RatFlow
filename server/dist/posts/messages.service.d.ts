import { Message } from "@prisma/client";
import { CommentsService } from "src/comments/comments.service";
import { VoteService } from "src/vote/vote.service";
import { PrismaService } from "../prisma.service";
import { CreateMessageDto } from "./dto/create-post.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
type MessageWithStats = Message & {
    stats: {
        upVotes: number;
        downVotes: number;
    };
};
export declare class MessagesService {
    private prisma;
    private commentService;
    private voteService;
    constructor(prisma: PrismaService, commentService: CommentsService, voteService: VoteService);
    create(createMessageDto: CreateMessageDto): Promise<Message>;
    findOneWithVotes(id: string): Promise<MessageWithStats>;
    findOne(id: string): Promise<Message>;
    findAll(): Promise<Message[]>;
    findAllWithVotes(): Promise<MessageWithStats[] | any>;
    findAllForFilter(id: string): Promise<any>;
    findCommentsForMessage(id: string): Promise<{
        message: any;
        comments: any;
    }>;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message>;
    remove(id: string): Promise<void>;
}
export {};
