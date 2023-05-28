import { Test, TestingModule } from "@nestjs/testing";
import { AppsModule } from "src/apps/apps.module";
import { PrismaService } from "src/prisma.service";
import { AnalyticsService } from "./analytics.service";

describe("AnalyticsService", () => {
    let service: AnalyticsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppsModule],
            providers: [AnalyticsService, PrismaService],
        }).compile();

        service = module.get<AnalyticsService>(AnalyticsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
