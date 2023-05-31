import { Injectable } from "@nestjs/common";
import { AnalyticsService } from "src/analytics/analytics.service";
@Injectable()
export class AnalyticSeed {
    constructor(private readonly analyticsService: AnalyticsService) {}

    async seed() {
        console.log("CLEARING ANALYTICS -----");
        await this.analyticsService.clear();
    }
}
