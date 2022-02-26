import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/database/database.module';
import { NewsModule } from 'src/news/news.module';
import { TwitterModule } from 'src/twitter/twitter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TwitterModule,
    NewsModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
