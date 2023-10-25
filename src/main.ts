import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const config = new DocumentBuilder()
  .setTitle('API Cuti')
  .setDescription('Dokumentasi API untuk endpoint Cuti')
  .setVersion('1.0')
  .addTag('api')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.use(express.json({ limit: process.env.APP_LIMIT_JSON }));
  app.use(express.urlencoded({ extended: true, limit: process.env.APP_LIMIT_URL_ENCODED }));

  await app.listen(3000);
}
bootstrap();
