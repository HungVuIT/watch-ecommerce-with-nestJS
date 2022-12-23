import { Controller, Get, HttpStatus, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {  }

  @Get('privacy-policy')
  @Render('privacyPolicy')
  root2() {  }
}
