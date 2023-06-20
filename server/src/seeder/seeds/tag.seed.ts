import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { AppsService } from "src/apps/apps.service";
import { TagsService } from "src/tags/tags.service";

@Injectable()
export class TagSeed {
    constructor(
        private readonly tagService: TagsService,
        private readonly appsService: AppsService
    ) {}

    async seed() {
        console.log("SEEDING TAGS -----");
        await this.tagService.clear();
        const apps = await this.appsService.findAll();
        let globalIndex = 0;
        for (let app of apps) {
            for (let i = 0; i < 5; i++) {
                const tag = await this.tagService.create({
                    name: `${faker.lorem.word()}${globalIndex}`,
                    appId: app.id,
                });
                console.log(`Created tag with id: ${tag.id}`);
                globalIndex++;
            }
        }
    }
}
