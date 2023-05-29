import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { CommandModule } from "nestjs-command";
import { AnalyticsModule } from "./analytics/analytics.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppsModule } from "./apps/apps.module";
import { AuthModule } from "./auth/auth.module";
import { SeedCommand } from "./commands/seed.command";
import { AppSeed } from "./commands/seeds/apps.seed";
import { TagSeed } from "./commands/seeds/tag.seed";
import { UserSeed } from "./commands/seeds/user.seed";
import { appConstant } from "./constant";
import { TagsModule } from "./tags/tags.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        AnalyticsModule,
        AppsModule,
        AuthModule,
        MongooseModule.forRoot(appConstant.db_url),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 15,
        }),
        TagsModule,
        UsersModule,
        CommandModule,
    ],
    controllers: [AppController],
    providers: [
        AppSeed,
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        SeedCommand,
        TagSeed,
        UserSeed,
    ],
})
export class AppModule {}
