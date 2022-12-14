import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ErrorFilter } from './errors.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Thêm validator pipes global, đồng thời bỏ các trường ko cần thiết với whitelist true
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET },{ path: 'favicon.ico', method: RequestMethod.GET }],
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'view'));
  app.setViewEngine('hbs');
  app.useGlobalFilters(new ErrorFilter());

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
