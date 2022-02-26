import { Inject, Injectable } from '@nestjs/common';
import { TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2';
import { TwitterClientConfig } from '../config/twitter-client-config';
import { Tweet } from '../types/tweet';

@Injectable()
export class TwitterClient {
  private twitterClient: TwitterApiReadOnly;

  constructor(
    @Inject(TwitterClientConfig) private config: TwitterClientConfig,
  ) {
    this.twitterClient = new TwitterApi(this.config.authToken).readOnly;
  }

  public async getAllTweetsFromUserSinceStart(start: Date): Promise<Tweet[]> {
    return [];
  }
}
