import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2';
import { TwitterClientConfig } from '../config/twitter-client-config';
import { Tweet } from '../types/tweet';

@Injectable()
export class TwitterClient {
  private twitterClient: TwitterApiReadOnly;
  private readonly logger = new Logger(TwitterClient.name);

  constructor(
    @Inject(TwitterClientConfig) private config: TwitterClientConfig,
  ) {
    this.twitterClient = new TwitterApi(this.config.authToken).readOnly;
  }

  public async getAllTweetsFromUserSinceStart(
    username: string,
    start: Date,
  ): Promise<Tweet[]> {
    return [];
  }

  @Cron(CronExpression.EVERY_SECOND)
  async testCron() {
    this.logger.debug('hello');
  }
}
