import { RouterContext } from '@koa/router';

const userMiddleware = async (ctx: RouterContext) => {
  const { decodedToken } = ctx.request.body;
  console.log('🦊 decodedToken', decodedToken);
};
