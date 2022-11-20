import { Global, Module } from '@nestjs/common';
import { VendorGuard } from './guard';
import { JwtStrategy } from './strategy';
import {HttpModule} from "@nestjs/axios"
import { SharedService } from './shared.service';
import { globalVariables } from './global.service';

@Global()
@Module({
    providers: [JwtStrategy, SharedService, globalVariables],
    exports: [SharedService, globalVariables]

})
export class SharedModule {}
