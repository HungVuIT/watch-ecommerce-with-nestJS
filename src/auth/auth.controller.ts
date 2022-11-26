import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('sign-up')
    @UseInterceptors(FileInterceptor(""))
    signup(@Body() body:authDto){
        return this.authService.signup(body);
    }

    @Post('sign-in')
    @UseInterceptors(FileInterceptor(""))
    signin(@Body() body:authDto){
        return this.authService.signin(body);
    }

    @Get('token')
    tokenByRefreshToken(@Req() req: Request){
        return this.authService.tokenByRefreshToken(req.headers.authorization.replace("Bearer ", ""))
    }
}
