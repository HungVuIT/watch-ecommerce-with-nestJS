import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {

    constructor(config: ConfigService) {
        const url =
            process.env.NODE_ENV === 'production' ? config.get('DATABASE_URL_PROD') : config.get('DATABASE_URL_LOCAL');
        super({
            datasources: {
                db: {
                    url: url,
                },
            },
        });
    }
}
