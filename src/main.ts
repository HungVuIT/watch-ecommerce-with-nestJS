import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Thêm validator pipes á global, đồng thời bỏ các trường ko cần thiết với whitelist true
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  await app.listen(new ConfigService().get("PORT"));
}
bootstrap();
