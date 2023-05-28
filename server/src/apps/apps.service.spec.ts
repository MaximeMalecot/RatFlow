import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma.service";
import { AppsService } from "./apps.service";

describe("AppsService", () => {
    let service: AppsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppsService, PrismaService],
        }).compile();

        service = module.get<AppsService>(AppsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
