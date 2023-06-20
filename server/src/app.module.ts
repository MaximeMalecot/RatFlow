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
import { appConstant } from "./constant";
import { SeederModule } from "./seeder/seeder.module";
import { TagsModule } from "./tags/tags.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        AnalyticsModule,
        AppsModule,
        AuthModule,
        CommandModule,
        MongooseModule.forRoot(appConstant.db_url),
        SeederModule,
        TagsModule,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 15,
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
