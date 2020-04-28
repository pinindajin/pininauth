import { TUserMask } from './user';
import { TRoleMask } from './role';

// TODO XSHT - Find cleaner way to partially apply permissions middleware
export type PERMISSIONS_PROPERTY = 'userMask' | 'roleMask';

export type Permissions = {
  userMask: number;
  roleMask: number;
};

export const hasPermissions = (bit: number, mask: number) =>
  (bit & mask) === bit;
