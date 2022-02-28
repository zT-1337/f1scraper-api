import { Inject, Injectable, Logger } from '@nestjs/common';
import { NewsStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UpdateNewsService {
  private readonly logger = new Logger(UpdateNewsService.name);
  constructor(@Inject(DatabaseService) private dbService: DatabaseService) {}

  public async setNewsStatus(id: number, status: NewsStatus): Promise<void> {
    try {
      await this.dbService.news.update({
        where: {
          id: id,
        },
        data: {
          newsStatus: status,
        },
      });
    } catch (error) {
      this.logger.error(`Error while updating news: ${error.message}`);
      throw new Error(error.message);
    }
  }
}
