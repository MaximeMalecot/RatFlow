import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { AnalyticSeed } from "./seeds/analytics.seed";
import { AppSeed } from "./seeds/apps.seed";
import { TagSeed } from "./seeds/tag.seed";
import { UserSeed } from "./seeds/user.seed";

@Injectable()
export class SeedCommand {
    constructor(
        private readonly analyticSeeder: AnalyticSeed,
        private readonly appSeeder: AppSeed,
        private readonly tagSeeder: TagSeed,
        private readonly userSeeder: UserSeed
    ) {}

    @Command({
        command: "db:seed",
        describe: "seed",
    })
    async seed() {
        await this.userSeeder.seed();
        await this.appSeeder.seed();
        await this.tagSeeder.seed();
        await this.analyticSeeder.seed();
    }
}
