import { HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): void;
    root2(): void;
    root3(): HttpStatus;
}
