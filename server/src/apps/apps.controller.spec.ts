import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma.service";
import { AppsController } from "./apps.controller";
import { AppsService } from "./apps.service";

describe("AppsController", () => {
    let controller: AppsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppsController],
            providers: [AppsService, PrismaService],
        }).compile();

        controller = module.get<AppsController>(AppsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
