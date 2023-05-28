import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';;
import { AnalyticsModule } from './analytics/analytics.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppsModule } from './apps/apps.module';
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [AnalyticsModule, UsersModule, AuthModule, AppsModule, 
    ThrottlerModule.forRoot({
        ttl: 60,
        limit: 15,
    }), TagsModule,],
  controllers: [AppController],
  providers: [
    AppService,
    {
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
    },],
})
export class AppModule {}
