import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterClient } from './client/twitter-client';
import {
  TwitterClientConfig,
  twitterClientConfigFactory,
} from './config/twitter-client-config';

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
