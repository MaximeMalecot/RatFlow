import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnalyticsService {
    private analytics: Object[] = [];
    constructor(private prisma: PrismaService) {}

    async create(data: CreateAnalyticsDto) {
        const res = await this.prisma.analytics.create({
            data
        });
        
        return res;
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
