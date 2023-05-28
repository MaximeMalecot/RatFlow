import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma.service";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

describe("TagsController", () => {
    let controller: TagsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TagsController],
            providers: [TagsService, PrismaService],
        }).compile();

        controller = module.get<TagsController>(TagsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
