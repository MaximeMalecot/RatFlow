import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { AppsService } from "src/apps/apps.service";
import { PaginationDto } from "src/dto/pagination.dto";
import { TagsService } from "src/tags/tags.service";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";
import { GetAnalyticsDto } from "./dto/get-analytics.dto";
import { PageViewDto } from "./dto/page-view.dto";
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
            const app = await this.appsService.getApp(appId);
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

    async getAvgSessionDuration(appId: string) {
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        const res = await this.analyticModel.aggregate([
            {
                $match: {
                    appId: app.id,
                    eventName: "session_end",
                },
            },
            {
                $group: {
                    _id: null,
                    duration: {
                        $avg: {
                            $dateDiff: {
                                startDate: "$customData.sessionStart",
                                endDate: "$customData.sessionEnd",
                                unit: "minute",
                            },
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    avgDuration: {
                        $avg: "$duration",
                    },
                },
            },
        ]);
        return {
            value: res[0].avgDuration,
            unit: "minute",
        };
    }

    async getAvgPageBySession(appId: string) {
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        const res = await this.analyticModel.aggregate([
            {
                $match: {
                    appId: app.id,
                    eventName: "page_changed",
                },
            },
            {
                $group: {
                    _id: "$sessionId",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    avgPages: {
                        $avg: "$count",
                    },
                },
            },
        ]);
        return {
            value: res[0].avgPages,
            unit: "pages",
        };
    }

    async getAvgSessionByTimeScale(
        appId: string,
        scale: "day" | "month" | "year"
    ) {
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        let scalePipe = {};
        switch (scale) {
            case "day":
                scalePipe = {
                    format: "%Y-%m-%d",
                    date: "$date",
                };
                break;
            case "month":
                scalePipe = {
                    format: "%Y-%m",
                    date: "$date",
                };
                break;
            case "year":
                scalePipe = {
                    format: "%Y",
                    date: "$date",
                };
                break;
        }
        const res = await this.analyticModel.aggregate([
            {
                $match: {
                    appId: app.id,
                    eventName: "session_end",
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: scalePipe,
                    },
                    count: { $sum: 1 }, // Utilise 1 pour compter le nombre d'objets, ou $sum: 1 si tu as un champ spécifique contenant un nombre
                },
            },
            {
                $group: {
                    _id: null,
                    avgSessions: {
                        $avg: "$count",
                    },
                },
            },
        ]);

        return {
            value: res[0].avgSessions,
            unit: "session",
            scale,
        };
    }

    async getSessionsStatsForMonth(appId: string, date: Date) {
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        const desiredMonth = await this.getStats(
            new Date(date.getFullYear(), date.getMonth(), 1),
            new Date(date.getFullYear(), date.getMonth() + 1, 0),
            app.id
        );

        const previousMonth = await this.getStats(
            new Date(date.getFullYear(), date.getMonth() - 1, 1),
            new Date(date.getFullYear(), date.getMonth(), 0),
            app.id
        );

        const desiredMonthValue = desiredMonth[0].sessions ?? 1;
        const previousMonthValue = previousMonth[0].sessions ?? 1;

        let growth = parseFloat(
            (
                ((desiredMonthValue - previousMonthValue) /
                    previousMonthValue) *
                100
            ).toFixed(2)
        );

        return {
            desiredMonth: {
                value: desiredMonth[0].sessions,
                unit: "session",
            },
            previousMonth: {
                value: previousMonth[0].sessions,
                unit: "session",
            },
            growth: {
                value: growth,
                unit: "%",
            },
        };
    }

    async getStatsOfCurrentYear(appId: string) {
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        const currentYear = new Date().getFullYear();
        const months = await Promise.all(
            Array.from(Array(12).keys()).map(async (month) => {
                let stat = await this.getStats(
                    new Date(currentYear, month, 1),
                    new Date(currentYear, month + 1, 0),
                    app.id
                );
                return {
                    date: new Date(currentYear, month, 1).toISOString(),
                    value: stat?.[0]?.sessions ?? 0,
                };
            })
        );
        return months;
    }

    async getClickThroughRate(appId: string, tagId: string) {
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        const tag = await this.tagService.findOne(tagId);
        if (!tag) {
            throw new NotFoundException("Tag not found");
        }

        const printCount = await this.analyticModel.aggregate([
            {
                $match: {
                    appId: app.id,
                    tagId: tag.id,
                    eventName: "print",
                },
            },
            {
                $count: "print",
            },
        ]);

        const eventCount = await this.analyticModel.aggregate([
            {
                $match: {
                    appId: app.id,
                    tagId: tag.id,
                    eventName: {
                        $nin: ["print", "session_end", "page_changed"],
                    },
                },
            },
            {
                $count: "events",
            },
        ]);

        const rate = parseFloat(
            (
                ((eventCount[0].events ?? 1) / (printCount[0].print ?? 1)) *
                100
            ).toFixed(2)
        );
        return {
            value: rate,
            unit: "%",
        };
    }

    async getPageView(appId: string, data: PageViewDto) {
        try {
            const app = await this.appsService.getApp(appId);
            if (!app) {
                throw new NotFoundException("App not found");
            }

            const pageView = await this.analyticModel.aggregate([
                {
                    $match: {
                        appId: app.id,
                        eventName: "page_changed",
                        ...data,
                    },
                },
                {
                    $count: "pageView",
                },
            ]);

            return {
                ...data,
                value: pageView[0]?.pageView ?? 0,
                unit: "views",
            };
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

    async getAvgClientByTimeScale(
        appId: string,
        scale: "day" | "month" | "year"
    ) {
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        let scalePipe = {};
        switch (scale) {
            case "day":
                scalePipe = {
                    format: "%Y-%m-%d",
                    date: "$date",
                };
                break;
            case "month":
                scalePipe = {
                    format: "%Y-%m",
                    date: "$date",
                };
                break;
            case "year":
                scalePipe = {
                    format: "%Y",
                    date: "$date",
                };
                break;
        }
        const res = await this.analyticModel.aggregate([
            {
                $match: {
                    appId: app.id,
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: scalePipe,
                    },
                    uniqueClientIds: { $addToSet: "$clientId" },
                },
            },
            {
                $group: {
                    _id: null,
                    avgClients: {
                        $avg: { $size: "$uniqueClientIds" },
                    },
                },
            },
        ]);

        return {
            value: res[0].avgClients,
            unit: "client",
            scale,
        };
    }

    async clear() {
        return await this.analyticModel.deleteMany({});
    }

    private async getStats(
        startDate: Date,
        endDate: Date,
        appId: mongoose.Types.ObjectId
    ) {
        return await this.analyticModel.aggregate([
            {
                $match: {
                    appId,
                    eventName: "session_end",
                    date: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $count: "sessions",
            },
        ]);
    }
}
