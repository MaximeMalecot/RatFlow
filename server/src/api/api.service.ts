import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) {}

  async create(createApiDto: CreateApiDto) {
    try {
      const res = await this.prisma.api.create({
        data: createApiDto,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
