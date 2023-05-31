import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppsModule } from "src/apps/apps.module";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { Analytic, AnalyticSchema } from "./schema/analytic.schema";

@Module({
    imports: [
        AppsModule,
        MongooseModule.forFeature([
            { name: Analytic.name, schema: AnalyticSchema },
        ]),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
    exports: [AnalyticsService],
})
export class AnalyticsModule {}
