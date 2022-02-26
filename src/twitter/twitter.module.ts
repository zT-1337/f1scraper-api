import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterClient } from './clients/twitter-client';
import {
  TwitterClientConfig,
  twitterClientConfigFactory,
} from './configs/twitter-client-config';

@Module({
  providers: [
    TwitterClient,
    {
      provide: TwitterClientConfig,
      useFactory: twitterClientConfigFactory,
      inject: [ConfigService],
    },
  ],
})
export class TwitterModule {}
