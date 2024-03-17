import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export const setupSwagger = (app: INestApplication) => {
  const configService: ConfigService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('PROJECT_NAME'))
    .setDescription(`Api for ${configService.get<string>('NODE_ENV')} - v${configService.get<string>('VERSION')}`)
    .setVersion(process.env.VERSION)
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
