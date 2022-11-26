import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if (!roles) {
    //   return true;
    // }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // // if (user.role in roles) return true;
    // else throw new ForbiddenException()

    if (user.role === 'VENDOR') return true;
    else return false;
  }
}
