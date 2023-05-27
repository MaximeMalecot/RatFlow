import { Module } from "@nestjs/common";
import { AppsModule } from "src/apps/apps.module";
import { PrismaService } from "src/prisma.service";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";

@Module({
    imports: [AppsModule],
    controllers: [AnalyticsController],
    providers: [AnalyticsService, PrismaService],
})
export class AnalyticsModule {}
