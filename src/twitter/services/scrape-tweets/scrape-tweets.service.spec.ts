import { Test, TestingModule } from '@nestjs/testing';
import { ScrapeTweetsService } from './scrape-tweets.service';

describe('ScrapeTweetsService', () => {
  let service: ScrapeTweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapeTweetsService],
    }).compile();

    service = module.get<ScrapeTweetsService>(ScrapeTweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
