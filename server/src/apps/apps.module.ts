import {
    Module,
    forwardRef,
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TagsModule } from "src/tags/tags.module";
import { UsersModule } from "src/users/users.module";
import { AppsController } from "./apps.controller";
import { AppsService } from "./apps.service";
import { App, AppSchema } from "./schema/app.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
        UsersModule,
        forwardRef(() => TagsModule),
    ],
    controllers: [AppsController],
    providers: [AppsService],
    exports: [AppsService],
})
export class AppsModule {}
