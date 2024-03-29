import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AnalyticsService } from "src/analytics/analytics.service";
import { TagsService } from "src/tags/tags.service";
import { UsersService } from "src/users/users.service";
import { CreateAppDto } from "./dto/create-app.dto";
import { LinkMailWithAppDto } from "./dto/link-email-with-app.dto";
import { LinkUserWithAppDto } from "./dto/link-user-with-app.dto";
import { UpdateAppOriginsDto } from "./dto/update-app-origins.dto";
import { UpdateAppDto } from "./dto/update-app.dto";
import { App } from "./schema/app.schema";

@Injectable()
export class AppsService {
    constructor(
        @InjectModel(App.name) private appModel: Model<App>,
        private readonly userService: UsersService,
        @Inject(forwardRef(() => TagsService))
        private readonly tagsService: TagsService,
        @Inject(forwardRef(() => AnalyticsService))
        private readonly analtycsService: AnalyticsService
    ) {}

    async getApps() {
        return this.appModel.find({});
    }

    async getSelfApps(userId: string) {
        return this.appModel.find({ owner: userId });
    }

    async getWhiteListApps(userId: string) {
        return await this.appModel.find({ users: { $in: [userId] } });
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

    async updateNameApp(id: string, name: string) {
        const app = await this.appModel.findById(id);
        if (!app) {
            throw new BadRequestException("App not found");
        }
        name = name.trim();
        if (name.length < 3) {
            throw new BadRequestException(
                "Name must be at least 3 characters long"
            );
        }

        app.name = name;
        return await app.save();
    }

    async updateApp(id: string, updateAppDto: UpdateAppDto) {
        try {
            const app = await this.appModel.findById(id);
            if (!app) {
                throw new NotFoundException("App not found");
            }
            await this.appModel.updateOne({ _id: id }, updateAppDto);
            return {
                message: "App updated successfully",
            };
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteApp(id: string) {
        const app = await this.appModel.findById(id);
        if (!app) {
            throw new BadRequestException("App not found");
        }
        await this.analtycsService.removeAllAnalyticsByAppId(id);
        await this.tagsService.removeAllTagsByAppId(id);
        await this.appModel.deleteOne({ _id: id });
        return null;
    }

    async getAppOrigins(id: string) {
        const app = await this.appModel.findById(id);
        return app.origins;
    }

    async updateAppOrigins(id: string, data: UpdateAppOriginsDto) {
        const app = await this.appModel.findById(id);
        if (!app) {
            throw new BadRequestException("App not found");
        }
        const { origins } = data;
        app.origins = Array.from(new Set(origins));
        return await app.save();
    }

    async findAll() {
        return this.appModel.find({});
    }

    async findAppForNameAndUser(name: string, userId: string) {
        return this.appModel.findOne({ name, owner: userId });
    }

    async clear() {
        await this.appModel.deleteMany({});
    }

    // async addUserToApp(id: string, appSecret: string, userId: string) {
    //     const app = await this.appModel.findById(id);
    //     if (!app) {
    //         throw new BadRequestException("App not found");
    //     }
    //     if (app.appSecret != appSecret) {
    //         throw new BadRequestException("App secret is invalid");
    //     }
    //     if (app.owner == userId) {
    //         throw new BadRequestException("User is already owner of this app");
    //     }
    //     if (app.users.includes(userId)) {
    //         throw new BadRequestException("User is already in this app");
    //     }
    //     app.users.push(userId);
    //     return app.save();
    // }

    async getUsersforApp(id: string) {
        try {
            const app = await this.appModel.findById(id);
            if (!app) {
                throw new NotFoundException("App not found");
            }
            const appWithUsers = await this.appModel
                .aggregate([
                    {
                        $match: {
                            _id: app._id,
                        },
                    },
                    {
                        $unwind: "$users",
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "users",
                            foreignField: "_id",
                            as: "user",
                        },
                    },
                    {
                        $project: {
                            "user.password": 0,
                            "user.roles": 0,
                            "user.createdAt": 0,
                            "user.__v": 0,
                            "user._id": 0,
                        },
                    },
                ])
                .then((apps) => {
                    return apps.reduce((acc, curr) => {
                        return [...acc, ...curr.user];
                    }, []);
                });
            return appWithUsers ?? [];
        } catch (e) {
            if (e instanceof HttpException) throw e;

            throw new InternalServerErrorException(e.message);
        }
    }

    async removeUserFromApp({ appId, email }: LinkMailWithAppDto) {
        try {
            const app = await this.appModel.findById(appId);
            if (!app) throw new NotFoundException("App not found");
            const user = await this.userService.findOneByEmail(email);
            if (!user) throw new NotFoundException("User not found");
            const updating = await this.appModel.updateOne(
                { _id: appId },
                { $pull: { users: user.id } }
            );
            return { success: updating.modifiedCount > 0 };
        } catch (e) {
            if (e instanceof HttpException) throw e;

            throw new InternalServerErrorException(e.message);
        }
    }

    async addUserToApp({ appId, email }: LinkMailWithAppDto) {
        try {
            const user = await this.userService.findOneByEmail(email);
            if (!user) throw new Error("User not found");
            const userId = user.id;
            const app = await this.appModel.findById(appId);
            if (!app) throw new NotFoundException("App not found");
            if (app.owner == userId)
                throw new BadRequestException(
                    "User is already owner of this app"
                );
            if (app.users.includes(userId))
                throw new BadRequestException("User is already in this app");
            await this.appModel.updateOne(
                { _id: appId },
                { $push: { users: userId } }
            );
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
        } finally {
            return {
                message: "If the user exists, he will be added to your app",
            };
        }
    }

    async isUserInApp({ appId, userId }: LinkUserWithAppDto) {
        try {
            const app = await this.appModel.findById(appId);
            if (!app) throw new NotFoundException("App not found");
            if (app.owner == userId) return true;
            if (app.users.includes(userId)) return true;
            return false;
        } catch (e) {
            return false;
        }
    }

    async isUserOwnerOfApp({ appId, userId }: LinkUserWithAppDto) {
        try {
            const app = await this.appModel.findById(appId);
            if (!app) throw new NotFoundException("App not found");
            if (app.owner == userId) return true;
            return false;
        } catch (e) {
            return false;
        }
    }
}
