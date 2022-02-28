import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsStatus } from '@prisma/client';
import { convertStringToInteger } from 'src/common/convert';
import { Page } from 'src/common/page';
import { AuthGuard } from 'src/news/guards/auth.guard';
import { GetNewsService } from 'src/news/services/get-news/get-news.service';
import { UpdateNewsService } from 'src/news/services/update-news/update-news.service';
import { NewsWithMedia } from 'src/news/types/news';
import { isNewsStatus } from 'src/news/utils/enum-type-guards';

@Controller('news')
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  constructor(
    @Inject(GetNewsService) private getNewsService: GetNewsService,
    @Inject(UpdateNewsService) private updateNewsService: UpdateNewsService,
  ) {}

  @Get()
  public async getNewsPage(
    @Query('page') pageParam: string,
    @Query('pageSize') pageSizeParam: string,
  ): Promise<Page<NewsWithMedia>> {
    const page = convertStringToInteger(pageParam, 0);
    const pageSize = convertStringToInteger(pageSizeParam, 25);

    try {
      return this.getNewsService.getPaginatedNews({ page, pageSize });
    } catch (error) {
      this.logger.error(`Error during news loading: ${error.message}`);
      throw new BadRequestException('Bad Request');
    }
  }

  @Patch(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  public async setNewsStatus(
    @Param('id') idParam: string,
    @Body() request: { newsStatus: NewsStatus },
  ): Promise<void> {
    const id = convertStringToInteger(idParam, -1);

    if (id < 0) {
      throw new BadRequestException('Id needs to be a positive integer');
    }

    if (!isNewsStatus(request.newsStatus)) {
      throw new BadRequestException('Invalid Value for news status');
    }

    try {
      await this.updateNewsService.setNewsStatus(id, request.newsStatus);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
