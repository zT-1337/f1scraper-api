import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetNewsService } from './services/get-news/get-news.service';

@Module({
  providers: [GetNewsService],
  imports: [DatabaseModule],
})
export class NewsModule {}
