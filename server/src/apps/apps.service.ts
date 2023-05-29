import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAppDto } from "./dto/create-app.dto";
import { App } from "./schema/app.schema";

@Injectable()
export class AppsService {
    constructor(@InjectModel(App.name) private appModel: Model<App>) {}

    async getApps() {
        return [];
    }

    async getSelfApps(userId: string) {
        return this.appModel.find({ owner: userId });
    }

    async getApp(id: string) {
        try {
            const app = await this.appModel.findById(id);
            return app;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async createApp(data: CreateAppDto, owner: string) {
        try {
            const exists = await this.appModel.findOne({
                name: data.name,
            });
            if (exists) {
                throw new BadRequestException(
                    "App with this name already exists"
                );
            }
            const res = new this.appModel({
                ...data,
                owner,
            });
            return res.save();
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(err.message);
        }
    }

    async addUserToApp(id: string, appSecret: string, userId: string) {
        const app = await this.appModel.findById(id);
        if (!app) {
            throw new BadRequestException("App not found");
        }
        if (app.appSecret != appSecret) {
            throw new BadRequestException("App secret is invalid");
        }
        if (app.owner == userId) {
            throw new BadRequestException("User is already owner of this app");
        }
        if (app.users.includes(userId)) {
            throw new BadRequestException("User is already in this app");
        }
        app.users.push(userId);
        return app.save();
    }

    async updateApp(id: string) {
        return {};
    }

    async deleteApp(id: string) {
        const app = await this.appModel.findById(id);
        if (!app) {
            throw new BadRequestException("App not found");
        }
        await this.appModel.deleteOne({ _id: id });
        return null;
    }

    async getAppOrigins(id: string) {
        const app = await this.appModel.findById(id);
        return app.origins;
    }
}
