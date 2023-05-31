import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppsService } from "src/apps/apps.service";
import { PaginationDto } from "src/dto/pagination.dto";
import { TagsService } from "src/tags/tags.service";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";
import { GetAnalyticsDto } from "./dto/get-analytics.dto";
import { Analytic } from "./schema/analytic.schema";

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectModel(Analytic.name) private analyticModel: Model<Analytic>,
        private appsService: AppsService,
        private tagService: TagsService
    ) {}

    async create(data: CreateAnalyticsDto, appId: string) {
        if (data.tagId) {
            const tag = await this.tagService.findOne(data.tagId);
            if (!tag) {
                throw new NotFoundException("Tag not found");
            }
        }
        const analytic = new this.analyticModel({ ...data, appId });
        return analytic.save();
    }

    async findAll(appId: string, paginate: PaginationDto) {
        try {
            const app = await this.appsService.getApp(appId);
            if (!app) {
                throw new NotFoundException("App not found");
            }
            const analytics = await this.analyticModel
                .find({
                    appId: app.id,
                })
                .limit(paginate.limit)
                .skip(paginate.skip)
                .sort({ date: -1 });
            return analytics;
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            return null;
        }
    }

    async findAllFiltered(
        appId: string,
        filters: GetAnalyticsDto,
        paginate: PaginationDto
    ) {
        try {
            const app = this.appsService.getApp(appId);
            if (!app) {
                throw new NotFoundException("App not found");
            }
            return await this.analyticModel
                .find({
                    ...filters,
                })
                .skip(paginate.skip)
                .limit(paginate.limit)
                .sort({ date: -1 });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            return null;
        }
    }

    async getAvgSessionDuration(appId: string) {}

    async getAvgPageBySession(appId: string) {}

    async getAvgSessionByTime(appId: string, time: string) {}

    async clear() {
        return await this.analyticModel.deleteMany({});
    }
}
