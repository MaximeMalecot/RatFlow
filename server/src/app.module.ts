import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [PostModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
