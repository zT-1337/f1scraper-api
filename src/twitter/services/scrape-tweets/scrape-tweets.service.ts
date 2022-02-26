import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ScrapeTweetsService {
  constructor(@Inject(DatabaseService) private dbService: DatabaseService) {}

  public async scrapeNewTweets(): Promise<void> {
    return;
  }
}
