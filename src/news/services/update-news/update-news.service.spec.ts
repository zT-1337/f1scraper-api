import { Test, TestingModule } from '@nestjs/testing';
import { UpdateNewsService } from './update-news.service';

describe('UpdateNewsService', () => {
  let service: UpdateNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateNewsService],
    }).compile();

    service = module.get<UpdateNewsService>(UpdateNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
