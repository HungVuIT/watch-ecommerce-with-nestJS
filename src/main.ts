import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Thêm validator pipes global, đồng thời bỏ các trường ko cần thiết với whitelist true
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
