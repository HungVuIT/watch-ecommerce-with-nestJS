import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Thêm validator pipes global, đồng thời bỏ các trường ko cần thiết với whitelist true
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
