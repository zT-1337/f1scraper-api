import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { TwitterClient } from './clients/twitter-client';
import {
  TwitterClientConfig,
  twitterClientConfigFactory,
} from './configs/twitter-client-config';
import {
  TwitterScraperConfig,
  twitterScraperConfigFactory,
} from './configs/twitter-scraper-config';
import { ScrapeTweetsService } from './services/scrape-tweets/scrape-tweets.service';

@Module({
  providers: [
    TwitterClient,
    {
      provide: TwitterClientConfig,
      useFactory: twitterClientConfigFactory,
      inject: [ConfigService],
    },
    ScrapeTweetsService,
    {
      provide: TwitterScraperConfig,
      useFactory: twitterScraperConfigFactory,
      inject: [ConfigService],
    },
  ],
  imports: [DatabaseModule],
})
export class TwitterModule {}
