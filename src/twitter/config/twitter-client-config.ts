import { ConfigService } from '@nestjs/config';

export class TwitterClientConfig {
  authToken: string;
}

export function twitterClientConfigFactory(
  configService: ConfigService,
): TwitterClientConfig {
  return {
    authToken: configService.get('TWITTER_AUTH_TOKEN'),
  };
}
