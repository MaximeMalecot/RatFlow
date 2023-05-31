import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AppsService } from "../../apps/apps.service";
@Injectable()
export class AppSeed {
    constructor(
        private readonly appsService: AppsService,
        private readonly usersService: UsersService
    ) {}

    async seed() {
        console.log("SEEDING APPS -----");
        await this.appsService.clear();
        let users = await this.usersService.findAll();
        for (let i = 0; i < 4; i++) {
            const app = await this.appsService.createApp(
                {
                    name: faker.commerce.productName(),
                },
                faker.helpers.arrayElement(users).id
            );
            console.log(`Created app with id: ${app.id}`);
        }
    }
}
