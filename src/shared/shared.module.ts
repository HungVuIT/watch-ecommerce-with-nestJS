import { Global, Module } from '@nestjs/common';
import { globalVariables } from './global.service';
import { TransResInterceptor } from './res.interceptor';
import { SharedService } from './shared.service';
import { JwtStrategy } from './strategy';

@Global()
@Module({
  providers: [JwtStrategy, SharedService, globalVariables],
  exports: [SharedService, globalVariables],
})
export class SharedModule {}
