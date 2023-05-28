import {
    BadRequestException,
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
            const exists = await this.prisma.tag.findFirst({
                where: {
                    name: createTagDto.name,
                    appId: createTagDto.appId,
                },
            });
            if (exists) {
                throw new BadRequestException(
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
            if (e?.code) {
                throw new BadRequestException("Malformed data");
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
                select: {
                    appId: true,
                    id: true,
                    name: true,
                    createdAt: true,
                },
            });
            if (!res) {
                throw new BadRequestException("Tag does not exist");
            }

            return res;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            if (e?.code) {
                throw new BadRequestException("Malformed data");
            }
            throw new InternalServerErrorException(e.message);
        }
    }

    async findAllByAppId(appId: string) {
        try {
            return await this.prisma.tag.findMany({
                where: {
                    appId,
                },
                select: {
                    appId: true,
                    id: true,
                    name: true,
                    createdAt: true,
                },
            });
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            if (e?.code) {
                throw new BadRequestException("Malformed data");
            }
            throw new InternalServerErrorException(e.message);
        }
    }

    async remove(id: string) {
        try {
            const exists = await this.prisma.tag.findUnique({
                where: {
                    id,
                },
            });

            if (!exists) {
                throw new BadRequestException("Tag does not exist");
            }

            const res = await this.prisma.tag.delete({
                where: {
                    id,
                },
            });

            if (res) {
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            if (e?.code) {
                throw new BadRequestException("Malformed data");
            }
            throw new InternalServerErrorException(e.message);
        }
    }
}
