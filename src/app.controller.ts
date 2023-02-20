import { Controller, Get, HttpStatus, Render } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('index')
    root() {}

    @Get('privacy-policy')
    @Render('privacyPolicy')
    root2() {}

    @Get('favicon.ico')
    root3() {
        return HttpStatus.OK;
    }
}
