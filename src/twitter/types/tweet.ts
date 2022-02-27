import { MediaType } from '@prisma/client';

export type TweetMedia = {
  url: string;
  type: MediaType;
};

export type Tweet = {
  username: string;
  body: string;
  published_at: Date;
  tweetMedias: TweetMedia[];
  tweetUrl: string;
};
