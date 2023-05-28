import {
    HttpException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTagDto } from "./dto/create-tag.dto";

@Injectable()
export class TagsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createTagDto: CreateTagDto) {
        try {
            const exists = this.prisma.tag.findMany({
                where: {
                    name: createTagDto.name,
                    appId: createTagDto.appId,
                },
            });
            if (exists) {
                throw new Error(
                    "Tag with this name already exists for this app"
                );
            }

            const res = await this.prisma.tag.create({
                data: {
                    ...createTagDto,
                },
            });

            return res;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException(e.message);
        }
    }

    async findOne(id: string) {
        try {
            const res = await this.prisma.tag.findUnique({
                where: {
                    id,
                },
            });
            return res;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException(e.message);
        }
    }

    remove(id: string) {
        try {
            const res = this.prisma.tag.delete({
                where: {
                    id,
                },
            });
            return res;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new InternalServerErrorException(e.message);
        }
    }
}
