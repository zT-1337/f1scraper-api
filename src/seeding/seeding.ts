import { Logger } from '@nestjs/common';
import { PrismaClient, ScraperSource } from '@prisma/client';

const logger = new Logger('Seeding');

export async function seedScraperLookups({
  dbClient,
  lookupStart,
}: {
  dbClient: PrismaClient;
  lookupStart: Date;
}) {
  const twitterLookup = await dbClient.scraperLookup.findUnique({
    where: { source: ScraperSource.TWITTER },
  });

  if (twitterLookup !== null) {
    logger.log('Twitter Lookup Source existing');
    return;
  }

  await dbClient.scraperLookup.create({
    data: {
      source: ScraperSource.TWITTER,
      lastLookup: lookupStart,
    },
  });

  logger.log('Twitter Lookup Source created');
}
