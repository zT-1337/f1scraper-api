import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Logger,
  Query,
} from '@nestjs/common';
import { convertStringToInteger } from 'src/common/convert';
import { Page } from 'src/common/page';
import { GetNewsService } from 'src/news/services/get-news/get-news.service';
import { NewsWithMedia } from 'src/news/types/news';

@Controller('news')
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  constructor(@Inject(GetNewsService) private getNewsService: GetNewsService) {}

  @Get()
  public async getNewsPage(
    @Query('page') pageParam: string,
    @Query('pageSize') pageSizeParam: string,
  ): Promise<Page<NewsWithMedia>> {
    try {
      const page = convertStringToInteger(pageParam, 0);
      const pageSize = convertStringToInteger(pageSizeParam, 25);

      return this.getNewsService.getPaginatedNews({ page, pageSize });
    } catch (error) {
      this.logger.error(`Error during news loading: ${error.message}`);
      throw new BadRequestException('Bad Request');
    }
  }
}
