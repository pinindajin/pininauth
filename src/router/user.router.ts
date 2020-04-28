import Router from '@koa/router';
import {
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
  updateUserHandler,
  getSelfUserHandler,
} from '../handler/user.handler';
import { jwtMiddleware } from '../middleware/jwt-middleware';
import { userMiddleware } from '../middleware/user-middleware';
import { getPermissionMiddleware } from '../middleware/permission-middleware';
import {
  READ_OTHER_USER,
  UPDATE_USER,
  ADD_USER,
  READ_SELF_USER,
} from '../common/permissions/user';

const userRouter = new Router({ prefix: '/api/users' });

const permissionMiddleware = getPermissionMiddleware('USER');

userRouter.get(
  '/self',
  jwtMiddleware,
  userMiddleware,
  permissionMiddleware(READ_SELF_USER),
  getSelfUserHandler
);
userRouter.get(
  '/',
  jwtMiddleware,
  userMiddleware,
  permissionMiddleware(READ_OTHER_USER),
  getAllUsersHandler
);
userRouter.get(
  '/:userId',
  jwtMiddleware,
  userMiddleware,
  permissionMiddleware(READ_OTHER_USER),
  getOneUserHandler
);
userRouter.patch(
  '/',
  jwtMiddleware,
  userMiddleware,
  permissionMiddleware(UPDATE_USER),
  updateUserHandler
);
userRouter.post(
  '/',
  jwtMiddleware,
  userMiddleware,
  permissionMiddleware(ADD_USER),
  createUserHandler
);

export { userRouter };
