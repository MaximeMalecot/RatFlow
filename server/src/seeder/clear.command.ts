import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { AnalyticsService } from "src/analytics/analytics.service";
import { AppsService } from "src/apps/apps.service";
import { TagsService } from "src/tags/tags.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ClearCommand {
    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly appsService: AppsService,
        private readonly tagsService: TagsService,
        private readonly usersService: UsersService
    ) {}

    @Command({
        command: "db:clear",
        describe: "clear",
    })
    async seed() {
        await this.analyticsService.clear();
        await this.appsService.clear();
        await this.tagsService.clear();
        await this.usersService.clear();
    }
}
