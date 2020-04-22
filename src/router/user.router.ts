import Router from '@koa/router';
import {
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
  updateUserHandler,
} from '../handler/user.handler';

const userRouter = new Router({ prefix: '/api/users' });

userRouter.get('/', getAllUsersHandler);
userRouter.get('/:userId', getOneUserHandler);
userRouter.patch('/', updateUserHandler);
userRouter.post('/', createUserHandler);

export { userRouter };
