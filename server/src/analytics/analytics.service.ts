import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnalyticsService {
    private analytics: Object[] = [];
    constructor(private prisma: PrismaService) {}

    create(createAnalyticsDto: CreateAnalyticsDto) {
        throw new Error('Method not implemented.');
    }

    async findAll() {
        try{
            return await this.prisma.analytics.findMany();
        }catch(err){
            console.log(err);
            return null;
        }
    }
}
