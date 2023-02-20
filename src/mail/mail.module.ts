import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

@Module({
    imports: [
        MailerModule.forRoot({
            // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
            // or
            transport: {
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: config.get('EMAIL_USERNAME'),
                    pass: config.get('EMAIL_PASSWORD'),
                },
            },
            defaults: {
                from: '"No Reply" <noreply@gmail.com>',
            },
            template: {
                dir: join(__dirname, '../../', 'view'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService], // 👈 export for DI
})
export class MailModule {}
