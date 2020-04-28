import { RouterContext } from '@koa/router';
import { Next } from 'koa';
import {
  hasPermissions,
  PERMISSION_TYPE,
  getPermissionMask,
} from '../common/permissions/permissions';
import { logInfo } from '../common/logger';

export const getPermissionMiddleware = (permissionType: PERMISSION_TYPE) => (
  requiredPermission: number
) => async (ctx: RouterContext, next: Next) => {
  const { user } = ctx.state;

  if (!user) {
    logInfo(
      'No user found on ctx.state. Try defining a user middleware to define user on ctx.state before this middleware.'
    );
    ctx.response.status = 401;
    return;
  }

  if (!user.permissions) {
    logInfo(
      'No permissions found on ctx.state.user. Try defining a user middleware to hydrate ctx.state.user before this middleware.'
    );
    ctx.response.status = 401;
    return;
  }

  if (
    !hasPermissions(
      requiredPermission,
      getPermissionMask(permissionType, user.permissions)
    )
  ) {
    ctx.response.status = 403;
    return;
  }

  await next();
};
