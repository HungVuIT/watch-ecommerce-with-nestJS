import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { TransResInterceptor } from 'src/shared/interceptor/res.interceptor';
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
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return HttpStatus.OK;
  }

  
  @Get('redirect-google')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {
    return HttpStatus.OK;
  }

  @Get('redirect-facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    return this.authService.facebookLogin(req)
  }
}
