import { Test, TestingModule } from "@nestjs/testing";
import { AppsModule } from "src/apps/apps.module";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";

describe("AnalyticsController", () => {
    let controller: AnalyticsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppsModule],
            controllers: [AnalyticsController],
            providers: [AnalyticsService],
        }).compile();

        controller = module.get<AnalyticsController>(AnalyticsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
