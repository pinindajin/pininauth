import Router from '@koa/router';

const defaultRouter = new Router();

defaultRouter.get('/healthcheck', (ctx: any, next: any) => {
  ctx.status = 200;
  next();
});

export { defaultRouter };
