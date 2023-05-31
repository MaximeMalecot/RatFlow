import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/dto/pagination.dto";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { AnalyticsService } from "./analytics.service";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";
import { GetAnalyticsDto } from "./dto/get-analytics.dto";
import { CreateAnalyticsGuard } from "./guards/create-analytics.guard";
import { GetAnalyticsGuard } from "./guards/get-analytics.guard";

@ApiTags("analytics")
@Controller("analytics")
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @UseGuards(CreateAnalyticsGuard)
    @Post()
    create(@Body() createAnalyticsDto: CreateAnalyticsDto, @Req() req: any) {
        return this.analyticsService.create(createAnalyticsDto, req.app.id);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId")
    findAll(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Query() paginate: PaginationDto
    ) {
        return this.analyticsService.findAll(appId, paginate);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId/filter")
    findAllQuery(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Query() query: GetAnalyticsDto,
        @Query() paginate: PaginationDto
    ) {
        console.log(query);
        return this.analyticsService.findAllFiltered(appId, query, paginate);
    }
}
