import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { Message, Prisma } from "@prisma/client";
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

@Injectable()
export class MessagesService {
    constructor(
        private prisma: PrismaService,
        private commentService: CommentsService,
        private voteService: VoteService
    ) {}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        try {
            let prismaOptions = {
                content: "",
                provider: {},
                user: {},
                filter: {},
            };
            const { content, providerId, userId, filterId } = createMessageDto;
            const provider = await this.prisma.provider.findUnique({
                where: { id: providerId },
            });
            if (!provider)
                throw new NotFoundException(
                    `Provider with id ${providerId} not found`
                );
            prismaOptions.provider = {
                connect: {
                    id: providerId,
                },
            };
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user)
                throw new NotFoundException(`User with id ${userId} not found`);
            prismaOptions.user = {
                connect: {
                    id: userId,
                },
            };
            if (filterId) {
                const filter = await this.prisma.filter.findUnique({
                    where: { id: filterId },
                });
                if (!filter)
                    throw new NotFoundException(
                        `Filter with id ${filterId} not found`
                    );
                prismaOptions.filter = {
                    connect: {
                        id: filterId,
                    },
                };
            }
            prismaOptions.content = content;

            return this.prisma.message.create({
                data: prismaOptions,
            });
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(err.message);
        }
    }

    async findOneWithVotes(id: string): Promise<MessageWithStats> {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new NotFoundException(`Message with id ${id} not found`);
        }
        const stats = await this.voteService.getMessageVotes(id);

        return { ...message, stats };
    }

    async findOne(id: string): Promise<Message> {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new NotFoundException(`Message with id ${id} not found`);
        }
        return message;
    }

    async findAll(): Promise<Message[]> {
        return this.prisma.message.findMany();
    }

    async findAllWithVotes(): Promise<MessageWithStats[] | any> {
        const messages = await this.prisma.message.findMany();
        const messagesWithStats = await Promise.all(
            messages.map(async (message) => {
                const stats = await this.voteService.getMessageVotes(
                    message.id
                );
                console.log(stats);
                return { ...message, stats };
            })
        );
        console.log(messagesWithStats);
        return messagesWithStats;
    }

    async findAllForFilter(id: string) {
        const messages = await this.prisma.message.findMany({
            where: {
                filter: {
                    id: id,
                },
            },
        });
        return messages;
    }

    async findCommentsForMessage(id: string) {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new NotFoundException(`Message with id ${id} not found`);
        }
        const comments = await this.commentService.findAllForMessage(id);
        return {
            message: message,
            comments: comments,
        };
    }

    async update(
        id: string,
        updateMessageDto: UpdateMessageDto
    ): Promise<Message> {
        try {
            if (updateMessageDto.filterId) {
                const filter = await this.prisma.filter.findUnique({
                    where: { id: updateMessageDto.filterId },
                });
                if (!filter)
                    throw new NotFoundException(
                        `Filter with id ${updateMessageDto.filterId} not found`
                    );
            }
            const message = await this.prisma.message.update({
                where: { id: id },
                data: updateMessageDto,
            });
            return message;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new NotFoundException(
                        `Message with id ${id} not found`
                    );
                }
            }
            throw new InternalServerErrorException();
        }
    }

    async remove(id: string): Promise<void> {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new NotFoundException(`Message with id ${id} not found`);
        }
        await this.prisma.message.delete({
            where: { id: id },
        });
        return null;
    }
}
