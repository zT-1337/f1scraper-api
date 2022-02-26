import { Test, TestingModule } from '@nestjs/testing';
import { GetNewsService } from './get-news.service';

describe('GetNewsService', () => {
  let service: GetNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetNewsService],
    }).compile();

    service = module.get<GetNewsService>(GetNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
