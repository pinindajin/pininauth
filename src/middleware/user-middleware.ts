import { RouterContext } from '@koa/router';
import { Next } from 'koa';
import { getOneUserById } from '../repository/user.repo';

export const userMiddleware = async (ctx: RouterContext, next: Next) => {
  const { userId } = ctx.state.user;
  const user = await getOneUserById(userId);

  if (!user) {
    ctx.response.status = 401;
    return;
  }

  ctx.state.user = {
    id: userId,
    ...user,
  };

  await next();
};
