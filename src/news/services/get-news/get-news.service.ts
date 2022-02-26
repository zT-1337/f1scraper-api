import { Inject, Injectable } from '@nestjs/common';
import { Page } from 'src/common/page';
import { DatabaseService } from 'src/database/database.service';
import { NewsWithMedia } from 'src/news/types/news';

@Injectable()
export class GetNewsService {
  constructor(@Inject(DatabaseService) private dbService: DatabaseService) {}

  public async getPaginatedNews({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }): Promise<Page<NewsWithMedia>> {
    const newsCount = await this.dbService.news.count();
    const data = await this.dbService.news.findMany({
      skip: page * pageSize,
      take: pageSize,
      include: {
        medias: true,
      },
    });

    return {
      data: data,
      page: page,
      pageSize: pageSize,
      pageCount: Math.ceil(newsCount / pageSize),
      totalItemCount: newsCount,
    };
  }
}
