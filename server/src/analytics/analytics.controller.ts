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
import { Public } from "src/auth/decorators/public.decator";
import { PaginationDto } from "src/dto/pagination.dto";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { AnalyticsService } from "./analytics.service";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";
import { GetAnalyticsDto } from "./dto/get-analytics.dto";
import { GetSessionStatsDto } from "./dto/get-sessions-stats.dto";
import { CreateAnalyticsGuard } from "./guards/create-analytics.guard";
import { GetAnalyticsGuard } from "./guards/get-analytics.guard";

@ApiTags("analytics")
@Controller("analytics")
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Public()
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
        return this.analyticsService.findAllFiltered(appId, query, paginate);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId/sessionDurationAvg")
    getAvgSessionDurationForApp(
        @Param("appId", ParseObjectIdPipe) appId: string
    ) {
        return this.analyticsService.getAvgSessionDuration(appId);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId/pagePerSessionAvg")
    getAvgPagePerSession(@Param("appId", ParseObjectIdPipe) appId: string) {
        return this.analyticsService.getAvgPageBySession(appId);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId/sessionPerPeriod")
    getAvgSessionForPeriod(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Query("scale") scale: "day" | "month" | "year" = "day"
    ) {
        return this.analyticsService.getAvgSessionByTimeScale(appId, scale);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId/sessionStatsForMonth")
    getSessionsStatsForMonth(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Query() data: GetSessionStatsDto
    ) {
        return this.analyticsService.getSessionsStatsForMonth(appId, data.date);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId/getStatsOfCurrentYear")
    getStatsOfCurrentYear(@Param("appId", ParseObjectIdPipe) appId: string) {
        return this.analyticsService.getStatsOfCurrentYear(appId);
    }

    @UseGuards(GetAnalyticsGuard)
    @Get(":appId/getClickThroughRate/:tagId")
    getClickThroughRate(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Param("tagId", ParseObjectIdPipe) tagId: string
    ) {
        return this.analyticsService.getClickThroughRate(appId, tagId);
    }
}
