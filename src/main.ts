import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsAdapter } from '@nestjs/platform-ws';
import { ServerOptions } from 'http';
import { join } from 'path';
import { AppModule } from './app.module';
import { ErrorFilter } from './errors.filter';

export class SocketAdapter extends IoAdapter {
    createIOServer(
        port: number,
        options?: ServerOptions & {
            namespace?: string;
            server?: any;
        }
    ) {
        const server = super.createIOServer(port, {
            ...options,
            cors: {
                origin: true,
                methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
            },
        });
        return server;
    }
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    //Thêm validator pipes global, đồng thời bỏ các trường ko cần thiết với whitelist true
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    );

    app.setGlobalPrefix('api', {
        exclude: [
            { path: '', method: RequestMethod.GET },
            { path: 'favicon.ico', method: RequestMethod.GET },
        ],
    });

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'view'));
    app.setViewEngine('hbs');
    app.useGlobalFilters(new ErrorFilter());

    // app.useWebSocketAdapter(new WsAdapter(app));

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
        credentials: true,
    });

    // app.enableCors({
    //     origin: 'http://localhost:3000',
    //   });
    
    app.useWebSocketAdapter(new SocketAdapter(app));

    await app.listen(process.env.PORT || 8000);
}
bootstrap();
