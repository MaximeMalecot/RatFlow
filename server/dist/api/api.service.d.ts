import { CreateApiDto } from './dto/create-api.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ApiService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createApiDto: CreateApiDto): Promise<void>;
}
