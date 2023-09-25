import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    cors: true,
  });
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static('assets'));
  await app.listen(3000);
}
bootstrap();
