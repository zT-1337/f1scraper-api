import { NewsStatus } from '@prisma/client';

const newsStatusValues: NewsStatus[] = [
  NewsStatus.UNREAD,
  NewsStatus.READ,
  NewsStatus.BOOKMARKED,
];

export function isNewsStatus(newsStatus: string): newsStatus is NewsStatus {
  return newsStatusValues.includes(newsStatus as NewsStatus);
}
