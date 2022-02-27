import { Inject, Injectable, Logger } from '@nestjs/common';
import { MediaType } from '@prisma/client';
import {
  TweetUserTimelineV2Paginator,
  TwitterApi,
  TwitterApiReadOnly,
} from 'twitter-api-v2';
import { TwitterClientConfig } from '../configs/twitter-client-config';
import { Tweet, TweetMedia } from '../types/tweet';

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
    start: string,
  ): Promise<Tweet[]> {
    const fetchedTweets = await this.fetchTweets({ username, start });
    const result = this.convertFetchedTweetsToTweetList({
      fetchedTweets,
      username,
    });

    this.logger.log(
      `Retrieved ${result.length} tweets from ${username} since ${start}`,
    );

    return result;
  }

  private async fetchTweets({
    username,
    start,
  }: {
    username: string;
    start: string;
  }) {
    const user = await this.twitterClient.v2.userByUsername(username);
    const tweets = await this.twitterClient.v2.userTimeline(user.data.id, {
      'tweet.fields': ['created_at', 'text', 'attachments', 'id'],
      'media.fields': ['url', 'type'],
      expansions: ['attachments.media_keys'],
      start_time: start,
    });

    while (!tweets.done) {
      await tweets.fetchNext();
    }

    return tweets;
  }

  private convertFetchedTweetsToTweetList({
    fetchedTweets,
    username,
  }: {
    fetchedTweets: TweetUserTimelineV2Paginator;
    username: string;
  }): Tweet[] {
    const result: Tweet[] = [];

    for (const tweet of fetchedTweets) {
      const medias = fetchedTweets.includes.medias(tweet);
      const tweetMedias: TweetMedia[] = medias
        .map((media) => {
          let type: MediaType = undefined;

          switch (media.type) {
            case 'video':
              type = MediaType.VIDEO;
              break;
            case 'photo':
              type = MediaType.IMAGE;
              break;
            default:
              type = MediaType.OTHER;
          }

          return {
            url: media.url,
            type: type,
          };
        })
        .filter((media) => media.url !== undefined && media.type !== undefined);

      result.push({
        username: username,
        body: tweet.text,
        published_at: new Date(tweet.created_at),
        tweetUrl: `https://twitter.com/${username}/status/${tweet.id}`,
        tweetMedias: tweetMedias,
      });
    }

    return result;
  }
}
