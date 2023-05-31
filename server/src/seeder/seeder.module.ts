import { Module } from "@nestjs/common";
import { AnalyticsModule } from "src/analytics/analytics.module";
import { AppsModule } from "src/apps/apps.module";
import { TagsModule } from "src/tags/tags.module";
import { UsersModule } from "src/users/users.module";
import { ClearCommand } from "./clear.command";
import { SeedCommand } from "./seed.command";
import { AnalyticSeed } from "./seeds/analytics.seed";
import { AppSeed } from "./seeds/apps.seed";
import { TagSeed } from "./seeds/tag.seed";
import { UserSeed } from "./seeds/user.seed";

@Module({
    imports: [AnalyticsModule, AppsModule, TagsModule, UsersModule],
    providers: [
        AnalyticSeed,
        AppSeed,
        ClearCommand,
        TagSeed,
        UserSeed,
        SeedCommand,
    ],
    exports: [SeedCommand, ClearCommand],
})
export class SeederModule {}
