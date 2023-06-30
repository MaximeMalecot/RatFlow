import {
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppsService } from "src/apps/apps.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { Tag } from "./schema/tags.schema";

@Injectable()
export class TagsService {
    constructor(
        @InjectModel(Tag.name) private tagModel: Model<Tag>,
        @Inject(forwardRef(() => AppsService))
        private readonly appsService: AppsService
    ) {}

    async create(createTagDto: CreateTagDto) {
        try {
            const app = await this.appsService.getApp(createTagDto.appId);
            if (!app) {
                throw new NotFoundException("App not found");
            }
            const tagExists = await this.tagModel.findOne({
                name: createTagDto.name,
                appId: createTagDto.appId,
            });
            if (tagExists) {
                throw new HttpException(
                    "Tag with this name already exists",
                    400
                );
            }

            const tag = new this.tagModel(createTagDto);
            return await tag.save();
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException(e.message);
        }
    }

    async findOne(id: string) {
        try {
            const tag = await this.tagModel.findById(id);

            if (!tag) {
                throw new NotFoundException("Tag not found");
            }

            return tag;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException(e.message);
        }
    }

    async findAllByAppId(appId: string) {
        try {
            return await this.tagModel.find(
                { appId },
                { appId: true, name: true, createdAt: true }
            );
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException(e.message);
        }
    }
    async removeAllTagsByAppId(appId: string) {
        try {
            return await this.tagModel.deleteMany({ appId });
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException(e.message);
        }
    }
    async remove(id: string) {
        try {
            const tag = await this.tagModel.deleteOne({ _id: id });
            if (tag.deletedCount === 0) {
                throw new NotFoundException("Tag not deleted");
            }
            return { success: true };
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException(e.message);
        }
    }

    async clear() {
        await this.tagModel.deleteMany({});
    }
}
