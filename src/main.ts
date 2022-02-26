import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config as envConfig } from 'dotenv';

envConfig();

async function bootstrap() {
  const port = parseInt(process.env.PORT) || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
