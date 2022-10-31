import { Module } from '@nestjs/common';
import { VendorGuard } from './guard';
import { JwtStrategy } from './strategy';
import {HttpModule} from "@nestjs/axios"


@Module({
    imports: [HttpModule],
    providers: [JwtStrategy]
})
export class SharedModule {}
