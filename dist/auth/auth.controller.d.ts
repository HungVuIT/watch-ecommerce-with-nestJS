import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: authDto): Promise<import(".prisma/client").User>;
    signin(body: authDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    tokenByRefreshToken(req: Request): Promise<{
        access_token: string;
    }>;
    googleAuth(req: any): Promise<HttpStatus>;
    googleAuthRedirect(req: any): Promise<"No user from google" | {
        access_token: string;
        refresh_token: string;
    }>;
    facebookAuth(req: any): Promise<HttpStatus>;
    facebookAuthRedirect(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    } | "No user from facebook">;
    resetPassword(email: string): Promise<HttpStatus>;
    renderPage(token: string): {
        token: string;
    };
    changePassword(id: number, body: {
        psw: string;
    }): Promise<HttpStatus>;
}
