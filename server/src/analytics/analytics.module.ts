import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppsModule } from "src/apps/apps.module";
import { TagsModule } from "src/tags/tags.module";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { Analytic, AnalyticSchema } from "./schema/analytic.schema";

@Module({
    imports: [
        forwardRef(() => AppsModule),
        MongooseModule.forFeature([
            { name: Analytic.name, schema: AnalyticSchema },
        ]),
        forwardRef(() => TagsModule),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
    exports: [AnalyticsService],
})
export class AnalyticsModule {}
