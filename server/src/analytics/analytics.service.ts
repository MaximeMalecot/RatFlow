import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAnalyticsDto } from "./dto/create-analytics.dto";
import { Analytic } from "./schema/analytic.schema";

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectModel(Analytic.name) private analyticModel: Model<Analytic>
    ) {}

    async create(data: CreateAnalyticsDto, appId: string): Promise<Analytic> {
        console.log(data, appId);
        const analytic = new this.analyticModel(data);

        return analytic.save();
    }

    async findAll() {
        try {
            return await this.analyticModel.find();
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
