import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: 'http://reqbin.com',
  });
  app.use(cookieParser());
  app.use(compression());
  await app.listen(configService.get('PORT'));
}
bootstrap();
