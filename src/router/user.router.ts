import Router from '@koa/router';
import {
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
  updateUserHandler,
} from '../handler/user.handler';
import { jwtMiddleware } from '../middleware/jwt-middleware';

const userRouter = new Router({ prefix: '/api/users' });

userRouter.get('/', getAllUsersHandler);
userRouter.get('/:userId', getOneUserHandler);
userRouter.patch('/', updateUserHandler);
userRouter.post('/', createUserHandler);

export { userRouter };
