import Router from '@koa/router';
import {
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
  updateUserHandler,
} from '../handler/user.handler';
import { jwtMiddleware } from '../middleware/jwt-middleware';
import { userMiddleware } from '../middleware/user-middleware';
import { permissionMiddleware } from '../middleware/permission-middleware';
import {
  READ_OTHER_USER,
  UPDATE_USER,
  ADD_USER,
} from '../common/permissions/user';

const userRouter = new Router({ prefix: '/api/users' });

const hasPermission = permissionMiddleware('userMask');

userRouter.get(
  '/',
  jwtMiddleware,
  userMiddleware,
  hasPermission(READ_OTHER_USER),
  getAllUsersHandler
);
userRouter.get(
  '/:userId',
  jwtMiddleware,
  userMiddleware,
  hasPermission(READ_OTHER_USER),
  getOneUserHandler
);
userRouter.patch(
  '/',
  jwtMiddleware,
  userMiddleware,
  hasPermission(UPDATE_USER),
  updateUserHandler
);
userRouter.post(
  '/',
  jwtMiddleware,
  userMiddleware,
  hasPermission(ADD_USER),
  createUserHandler
);

export { userRouter };
