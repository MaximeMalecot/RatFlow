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
import { UserCommand } from "./users/users.command";
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
        // TagsModule,
        UsersModule,
        CommandModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        UserCommand,
    ],
})
export class AppModule {}
