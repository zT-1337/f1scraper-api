import { Inject, Injectable } from '@nestjs/common';
import { NewsStatus } from '@prisma/client';
import { Page } from 'src/common/page';
import { DatabaseService } from 'src/database/database.service';
import { NewsWithMedia } from 'src/news/types/news';

@Injectable()
export class GetNewsService {
  constructor(@Inject(DatabaseService) private dbService: DatabaseService) {}

  public async getPaginatedNews({
    page,
    pageSize,
    newsStatus,
  }: {
    page: number;
    pageSize: number;
    newsStatus: NewsStatus;
  }): Promise<Page<NewsWithMedia>> {
    const newsCount = await this.dbService.news.count({
      where: { newsStatus: newsStatus },
    });
    const pageCount = Math.ceil(newsCount / pageSize);

    if (page < 0) {
      page = 0;
    }

    if (page >= pageCount) {
      page = Math.max(pageCount - 1, 0);
    }

    if (pageSize < 0) {
      pageSize = 1;
    }

    const data = await this.dbService.news.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: {
        newsStatus: newsStatus,
      },
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
