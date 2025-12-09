import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/entities/user.entity'; // import your User entity

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    // specify return type
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    return request.user;
  },
);
