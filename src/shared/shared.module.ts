import { Global, Module } from '@nestjs/common';
import { globalVariables } from './global.service';
import { SharedService } from './shared.service';
import { JwtStrategy } from './strategy';

@Global()
@Module({
  providers: [JwtStrategy, SharedService, globalVariables],
  exports: [SharedService, globalVariables],
})
export class SharedModule {}
