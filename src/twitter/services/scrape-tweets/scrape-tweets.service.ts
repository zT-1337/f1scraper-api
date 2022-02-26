import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Media, ScraperSource } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { TwitterClient } from 'src/twitter/clients/twitter-client';
import { TwitterScraperConfig } from 'src/twitter/configs/twitter-scraper-config';
import { Tweet } from 'src/twitter/types/tweet';

@Injectable()
export class ScrapeTweetsService {
  private isScraping: boolean;
  private readonly logger = new Logger(ScrapeTweetsService.name);

  constructor(
    @Inject(DatabaseService) private dbService: DatabaseService,
    @Inject(TwitterScraperConfig) private config: TwitterScraperConfig,
    @Inject(TwitterClient) private twitterClient: TwitterClient,
  ) {
    this.isScraping = false;
  }

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

    this.logger.debug(
      `Start fetching tweets for ${this.config.usernames.join(', ')}`,
    );

    const tweets: Tweet[] = [];
    for (const username of this.config.usernames) {
      try {
        tweets.push(
          ...(await this.twitterClient.getAllTweetsFromUserSinceStart(
            username,
            lastTwitterLookup.lastLookup.toISOString(),
          )),
        );
      } catch (error) {
        this.logger.error(
          `Fetching tweets for ${username} went wrong: '${error.message}'`,
        );
        return;
      }
    }

    await this.dbService.scraperLookup.update({
      where: { source: ScraperSource.TWITTER },
      data: { lastLookup: new Date() },
    });

    const newsCreationPromises = tweets.map(async (tweet) => {
      const medias = tweet.mediaUrls.map((mediaUrl) => {
        return { url: mediaUrl } as Media;
      });

      return this.dbService.news.create({
        data: {
          title: `Tweet by ${tweet.username}`,
          author: tweet.username,
          body: tweet.body,
          publishedAt: tweet.published_at,
          sourceUrl: tweet.tweetUrl,
          medias: {
            createMany: {
              data: [...medias],
            },
          },
        },
      });
    });

    const result = await Promise.all(newsCreationPromises);
    this.logger.log(`Created ${result.length} news`);

    return;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  public async scrapeJob() {
    //This locking mechanism only works because of the single threadedness of node.js
    if (this.isScraping) return;

    this.isScraping = true;
    await this.scrapeNewTweets();
    this.isScraping = false;
  }
}
