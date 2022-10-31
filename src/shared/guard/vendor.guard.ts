import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if (!roles) {
    //   return true;
    // }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // // if (user.role in roles) return true;
    // else throw new ForbiddenException()

    if (user.role === 'VENDOR') {
      const shop = await this.prisma.shop.findUnique({
        where: { UID: user.id },
      });

      request.shop = shop;

      return true;
    } else return false;
  }
}
