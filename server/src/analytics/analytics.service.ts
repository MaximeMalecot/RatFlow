import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppsService } from "src/apps/apps.service";
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

    async create(data: CreateAnalyticsDto, appId: string): Promise<Analytic> {
        if (data.tagId) {
            const tag = await this.tagService.findOne(data.tagId);
            if (!tag) {
                throw new NotFoundException("Tag not found");
            }
        }
        const analytic = new this.analyticModel(data);
        return analytic.save();
    }

    async findAll(appId: string) {
        try {
            const app = this.appsService.getApp(appId);
            if (!app) {
                throw new NotFoundException("App not found");
            }
            return await this.analyticModel.find();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            return null;
        }
    }

    async findAllFiltered(appId: string, filters: GetAnalyticsDto) {
        try {
            const app = this.appsService.getApp(appId);
            if (!app) {
                throw new NotFoundException("App not found");
            }
            return await this.analyticModel.find({
                ...filters,
            });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            return null;
        }
    }

    async clear() {
        return await this.analyticModel.deleteMany({});
    }
}
