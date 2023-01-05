import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { authDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private mail;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, mail: MailService);
    googleLogin(req: any): Promise<"No user from google" | {
        access_token: string;
        refresh_token: string;
    }>;
    facebookLogin(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    } | "No user from facebook">;
    signup(body: authDto): Promise<import(".prisma/client").User>;
    signin(body: authDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    tokenByRefreshToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
    changePassword(id: number, password: string): Promise<HttpStatus>;
    sendResetPassMail(email: string): Promise<HttpStatus>;
    signToken(id: number, username: string): {
        access_token: string;
        refresh_token: string;
    };
}
