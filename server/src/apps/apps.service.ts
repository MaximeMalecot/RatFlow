import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateAppDto } from "./dto/create-app.dto";

@Injectable()
export class AppsService {
    constructor(private prisma: PrismaService) {}

    async getApps() {
        return [];
    }

    async getSelfApps() {
        return [];
    }

    async getApp(id: string) {
        return {};
    }

    async createApp(data: CreateAppDto, ownerId: string) {
        try {
            const res = await this.prisma.app.create({
                data: {
                    ...data,
                    ownerId: ownerId,
                },
            });
            return res;
        } catch (err) {
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
}
