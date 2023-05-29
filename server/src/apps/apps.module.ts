import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";
import { AppsController } from "./apps.controller";
import { AppsService } from "./apps.service";
import { App, AppSchema } from "./schema/app.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
        UsersModule,
    ],
    controllers: [AppsController],
    providers: [AppsService],
    exports: [AppsService],
})
export class AppsModule {}
