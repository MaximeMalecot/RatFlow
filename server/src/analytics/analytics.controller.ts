import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";
import { AnalyticsGuard } from "./guards/analytics.guard";

@ApiTags("analytics")
@Controller("analytics")
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @UseGuards(AnalyticsGuard)
    @Post()
    create(@Body() createAnalyticsDto: CreateAnalyticsDto, @Req() req: any) {
        return this.analyticsService.create(createAnalyticsDto, req.app.id);
    }

    @Get()
    findAll() {
        return this.analyticsService.findAll();
    }
}
