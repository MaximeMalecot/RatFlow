import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { TagsService } from "./tags.service";

@Controller("tags")
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagsService.create(createTagDto);
    }

    @Get()
    findAllByAppId(@Query("appId") appId: string) {
        return this.tagsService.findAllByAppId(appId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.tagsService.findOne(id);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.tagsService.remove(id);
    }
}
