import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma.service";
import { TagsService } from "./tags.service";

describe("TagsService", () => {
    let service: TagsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TagsService, PrismaService],
        }).compile();

        service = module.get<TagsService>(TagsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
