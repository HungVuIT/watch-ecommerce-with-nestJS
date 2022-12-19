import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { TransResInterceptor } from 'src/shared/res.interceptor';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';

@UseInterceptors(TransResInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor(''))
  signup(@Body() body: authDto) {
    return this.authService.signup(body);
  }

  @Post('sign-in')
  @UseInterceptors(FileInterceptor(''))
  signin(@Body() body: authDto) {
    return this.authService.signin(body);
  }

  @Get('token')
  tokenByRefreshToken(@Req() req: Request) {
    return this.authService.tokenByRefreshToken(
      req.headers.authorization.replace('Bearer ', ''),
    );
  }
}
