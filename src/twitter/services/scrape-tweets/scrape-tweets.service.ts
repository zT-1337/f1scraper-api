import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScraperSource } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { TwitterScraperConfig } from 'src/twitter/configs/twitter-scraper-config';

@Injectable()
export class ScrapeTweetsService {
  private readonly logger = new Logger(ScrapeTweetsService.name);

  constructor(
    @Inject(DatabaseService) private dbService: DatabaseService,
    @Inject(TwitterScraperConfig) private config: TwitterScraperConfig,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async scrapeNewTweets(): Promise<void> {
    const lastTwitterLookup = await this.dbService.scraperLookup.findUnique({
      where: {
        source: ScraperSource.TWITTER,
      },
    });

    if (lastTwitterLookup === null) {
      this.logger.error('Twitter Scrape Source is missing in DB');
      return;
    }

    return;
  }
}
