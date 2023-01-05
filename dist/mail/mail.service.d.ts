import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class MailService {
    private mailerService;
    private prisma;
    constructor(mailerService: MailerService, prisma: PrismaService);
    sendUserConfirmation(to_email: string, token: string): Promise<void>;
}
