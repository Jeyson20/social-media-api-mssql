import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api')
  await app.listen(AppModule.port || 3000);
}
bootstrap().then(() => {
  Logger.log('Application is up and running 🚀');
});

