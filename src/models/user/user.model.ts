import { Permissions } from '../../common/permissions/permissions';

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  passwordHash: string;
  permissions: Permissions;
};
