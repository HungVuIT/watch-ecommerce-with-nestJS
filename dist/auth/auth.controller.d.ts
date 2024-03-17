import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: authDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        password: string;
        email: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        gender: import(".prisma/client").Gender;
        birthDay: Date;
        avatar: string;
        status: boolean;
        role: import(".prisma/client").Role;
        isActive: boolean;
    }, unknown, never> & {}>;
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
