"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const comments_service_1 = require("src/comments/comments.service");
const vote_service_1 = require("src/vote/vote.service");
const prisma_service_1 = require("../prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma, commentService, voteService) {
        this.prisma = prisma;
        this.commentService = commentService;
        this.voteService = voteService;
    }
    async create(createMessageDto) {
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
                throw new common_1.NotFoundException(`Provider with id ${providerId} not found`);
            prismaOptions.provider = {
                connect: {
                    id: providerId,
                },
            };
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user)
                throw new common_1.NotFoundException(`User with id ${userId} not found`);
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
                    throw new common_1.NotFoundException(`Filter with id ${filterId} not found`);
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
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async findOneWithVotes(id) {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with id ${id} not found`);
        }
        const stats = await this.voteService.getMessageVotes(id);
        return Object.assign(Object.assign({}, message), { stats });
    }
    async findOne(id) {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with id ${id} not found`);
        }
        return message;
    }
    async findAll() {
        return this.prisma.message.findMany();
    }
    async findAllWithVotes() {
        const messages = await this.prisma.message.findMany();
        const messagesWithStats = await Promise.all(messages.map(async (message) => {
            const stats = await this.voteService.getMessageVotes(message.id);
            console.log(stats);
            return Object.assign(Object.assign({}, message), { stats });
        }));
        console.log(messagesWithStats);
        return messagesWithStats;
    }
    async findAllForFilter(id) {
        const messages = await this.prisma.message.findMany({
            where: {
                filter: {
                    id: id,
                },
            },
        });
        return messages;
    }
    async findCommentsForMessage(id) {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with id ${id} not found`);
        }
        const comments = await this.commentService.findAllForMessage(id);
        return {
            message: message,
            comments: comments,
        };
    }
    async update(id, updateMessageDto) {
        try {
            if (updateMessageDto.filterId) {
                const filter = await this.prisma.filter.findUnique({
                    where: { id: updateMessageDto.filterId },
                });
                if (!filter)
                    throw new common_1.NotFoundException(`Filter with id ${updateMessageDto.filterId} not found`);
            }
            const message = await this.prisma.message.update({
                where: { id: id },
                data: updateMessageDto,
            });
            return message;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new common_1.NotFoundException(`Message with id ${id} not found`);
                }
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async remove(id) {
        const message = await this.prisma.message.findUnique({
            where: { id: id },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with id ${id} not found`);
        }
        await this.prisma.message.delete({
            where: { id: id },
        });
        return null;
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _b : Object, typeof (_c = typeof vote_service_1.VoteService !== "undefined" && vote_service_1.VoteService) === "function" ? _c : Object])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map