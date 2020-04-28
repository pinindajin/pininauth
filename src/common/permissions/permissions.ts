import { TUserMask } from './user';
import { TRoleMask } from './role';

export type Permissions = {
  userMask: number;
  roleMask: number;
};

export const hasPermissions = (bit: number, mask: number) =>
  (bit & mask) === bit;
