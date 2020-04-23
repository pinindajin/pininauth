import Router from '@koa/router';
import { loginHandler } from '../handler/auth.handler';

const authRouter = new Router({ prefix: '/auth' });

authRouter.post('/login', loginHandler);

export { authRouter };
