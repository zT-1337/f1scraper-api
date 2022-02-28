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
    const pageCount = Math.ceil(newsCount / pageSize);

    if (page < 0) {
      page = 0;
    }

    if (page >= pageCount) {
      page = pageCount - 1;
    }

    if (pageSize < 0) {
      pageSize = 1;
    }

    const data = await this.dbService.news.findMany({
      skip: page * pageSize,
      take: pageSize,
      include: {
        medias: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return {
      data: data,
      page: page,
      pageSize: pageSize,
      pageCount: pageCount,
      totalItemCount: newsCount,
    };
  }
}
