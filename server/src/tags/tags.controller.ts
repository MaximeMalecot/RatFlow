import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
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

    @Get(":id")
    findOne(@Param("id", ParseUUIDPipe) id: string) {
        return this.tagsService.findOne(id);
    }

    @Delete(":id")
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.tagsService.remove(id);
    }
}
