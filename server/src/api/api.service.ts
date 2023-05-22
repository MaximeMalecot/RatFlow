import { Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Injectable()
export class ApiService {
  create(createApiDto: CreateApiDto) {
    return 'This action adds a new api';
  }
}
