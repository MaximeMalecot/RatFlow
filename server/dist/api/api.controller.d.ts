import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    create(createApiDto: CreateApiDto): Promise<void>;
}
