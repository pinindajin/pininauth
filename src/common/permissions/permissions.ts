export type Permissions = {
  userMask: number;
  roleMask: number;
};

export type PERMISSION_TYPE = 'USER' | 'ROLE';

export const getPermissionMask = (
  permissionType: PERMISSION_TYPE,
  permissions: Permissions
): number => {
  if (permissionType === 'USER') {
    return permissions.userMask;
  }
  if (permissionType === 'ROLE') {
    return permissions.roleMask;
  }
  return 0;
};

export const hasPermissions = (bit: number, mask: number) =>
  (bit & mask) === bit;
