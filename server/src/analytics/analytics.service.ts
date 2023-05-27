import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";

@Injectable()
export class AnalyticsService {
    private analytics: Object[] = [];
    constructor(private prisma: PrismaService) {}

    async create(data: CreateAnalyticsDto, appId: string) {
        console.log(data, appId);
        // const res = await this.prisma.analytics.create({
        //     data,
        // });

        return {};
    }

    async findAll() {
        try {
            return await this.prisma.analytics.findMany();
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
