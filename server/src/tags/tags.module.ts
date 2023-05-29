import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppsModule } from "src/apps/apps.module";
import { Tag, TagSchema } from "./schema/tags.schema";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
    controllers: [TagsController],
    providers: [TagsService],
    exports: [TagsService],
    imports: [
        AppsModule,
        MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    ],
})
export class TagsModule {}
