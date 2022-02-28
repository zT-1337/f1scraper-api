import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NewsController } from './controllers/news/news.controller';
import { GetNewsService } from './services/get-news/get-news.service';
import { UpdateNewsService } from './services/update-news/update-news.service';

@Module({
  providers: [GetNewsService, UpdateNewsService],
  imports: [DatabaseModule],
  controllers: [NewsController],
})
export class NewsModule {}
