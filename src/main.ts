import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config as envConfig } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { seedScraperLookups } from './seeding/seeding';

envConfig();

async function bootstrap() {
  seedDb();
  startApp();
}

async function seedDb() {
  const dbClient = new PrismaClient();
  const lookupStart = new Date(process.env.LOOKUP_START);
  await seedScraperLookups({ dbClient, lookupStart });
  await dbClient.$disconnect();
}

async function startApp() {
  const port = parseInt(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
