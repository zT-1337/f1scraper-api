import { ConfigService } from '@nestjs/config';

export class TwitterScraperConfig {
  usernames: string[];
}

export function twitterScraperConfigFactory(
  configService: ConfigService,
): TwitterScraperConfig {
  return {
    usernames: configService
      .get<string>('TWITTER_USERNAMES_TO_LOOKUP')
      .split(','),
  };
}
