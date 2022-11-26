import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Shop = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      //@ts-ignore
      return request.shop[data];
    }
    //@ts-ignore
    return request.shop;
  },
);
