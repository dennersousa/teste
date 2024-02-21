import { NestFactory } from '@nestjs/core';
import { Module } from './entidades/entidade.module';

async function bootstrap() {
  const app = await NestFactory.create(Module);
  await app.listen(3000);
}
bootstrap();
