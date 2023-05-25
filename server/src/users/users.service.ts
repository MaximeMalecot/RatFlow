import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { compareSync, hash } from "bcrypt";
import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        try {
            createUserDto.password = await hash(createUserDto.password, 10);
            const res = await this.prisma.user.create({
                data: createUserDto,
            });
            return res;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new BadRequestException(
                        `email already used`
                    );
                }
            }
            throw new InternalServerErrorException();
        }
    }

    findAll(): Promise<User[] | null> {
        return this.prisma.user.findMany();
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password && !updateUserDto.oldPassword) {
            throw new BadRequestException("Old password is required");
        }
        if (updateUserDto.oldPassword) {
            let user = await this.prisma.user.findUnique({
                where: { id: id },
                select: { password: true },
            });
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            if (!compareSync(updateUserDto.oldPassword, user.password)) {
                throw new BadRequestException("Old password is incorrect");
            }
            delete updateUserDto.oldPassword;
        }
        if (updateUserDto.password) {
            updateUserDto.password = await hash(updateUserDto.password, 10);
        }
        try {
            const user = await this.prisma.user.update({
                where: { id: id },
                data: updateUserDto,
            });
            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new NotFoundException(`User with id ${id} not found`);
                }
            }
            throw new InternalServerErrorException();
        }
    }

    async remove(id: string) {
        let user = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.prisma.user.delete({
            where: { id: id },
        });
        return null;
    }
}
