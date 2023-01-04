import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private prisma: PrismaService) {}

  async sendUserConfirmation( to_email: string, token: string) {
    const host =   process.env.NODE_ENV === 'production'
    ? 'https://dhwatch.onrender.com'
    : 'http://localhost:8000';

    const url = host + `/api/auth/change-password-page?token=` + token;

    await this.mailerService.sendMail({
      to: to_email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Confirm your Email',
      template: './resetMail', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        url,
      },
    });
  }
}