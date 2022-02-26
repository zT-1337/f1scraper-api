import { Test, TestingModule } from '@nestjs/testing';
import { TwitterClient } from './twitter-client';

describe('TwitterClient', () => {
  let provider: TwitterClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitterClient],
    }).compile();

    provider = module.get<TwitterClient>(TwitterClient);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
