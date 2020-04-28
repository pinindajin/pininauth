import Router from '@koa/router';
import {
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
  updateUserHandler,
} from '../handler/user.handler';
import { jwtMiddleware } from '../middleware/jwt-middleware';
import { userMiddleware } from '../middleware/user-middleware';

const userRouter = new Router({ prefix: '/api/users' });

userRouter.get('/', jwtMiddleware, userMiddleware, getAllUsersHandler);
userRouter.get('/:userId', jwtMiddleware, getOneUserHandler);
userRouter.patch('/', jwtMiddleware, updateUserHandler);
userRouter.post('/', jwtMiddleware, createUserHandler);

export { userRouter };
