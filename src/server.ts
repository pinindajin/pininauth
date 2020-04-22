import Koa from 'koa';
import Router from '@koa/router';
import cors from 'koa2-cors';
import bodyparser from 'koa-bodyparser';
import { defaultRouter, userRouter } from './router/';
const server = new Koa();

/* cors */
server.use(cors());

/* parsing */
server.use(bodyparser());

/* routes */
const router = new Router();
server.use(defaultRouter.routes());
server.use(userRouter.routes());

/* startup */
export { server };
