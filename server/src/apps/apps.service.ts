import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { CreateAppDto } from "./dto/create-app.dto";

@Injectable()
export class AppsService {
    constructor(private prisma: PrismaService) {}

    async getApps() {
        return [];
    }

    async getSelfApps(userId: string) {
        return this.prisma.app.findMany({
            where: {
                ownerId: userId,
            },
        });
    }

    async getApp(id: string) {
        try {
            const app = await this.prisma.app.findUnique({
                where: {
                    id: id,
                },
            });
            return app;
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2023") {
                    throw new BadRequestException(`AppId malformated`);
                }
            }
            throw new InternalServerErrorException(err.message);
        }
    }

    async createApp(data: CreateAppDto, ownerId: string) {
        try {
            const exists = await this.prisma.app.findMany({
                where: {
                    name: data.name,
                },
            });
            if (exists) {
                throw new BadRequestException(
                    "App with this name already exists"
                );
            }
            const res = await this.prisma.app.create({
                data: {
                    ...data,
                    ownerId: ownerId,
                },
            });
            return res;
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(err.message);
        }
    }

    async addUserToApp(id: string) {
        return {};
    }

    async updateApp(id: string) {
        return {};
    }

    async deleteApp(id: string) {
        return {};
    }

    async getAppOrigins(id: string) {
        const app = await this.prisma.app.findUnique({
            where: {
                id: id,
            },
        });
        return app.origins;
    }
}
