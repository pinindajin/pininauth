import { User } from '../../models/user/user.model';
import { USER_ROLE } from '../../common/permissions/role';
import {
  ADD_USER,
  READ_OTHER_USER,
  READ_SELF_USER,
  UPDATE_USER,
} from '../../common/permissions/user';

const userSamples: User[] = [
  {
    id: 'd2c15702-8f63-4b03-86dc-3013212aa348',
    firstName: 'xena',
    lastName: '',
    email: 'xena@gmail.com',
    passwordHash: 'xenapass',
    permissions: {
      roleMask: USER_ROLE,
      userMask: ADD_USER | READ_OTHER_USER | READ_SELF_USER | UPDATE_USER,
    },
  },
  {
    id: '1b50043d-bec4-4610-b37d-cfa1fef04c56',
    firstName: 'pippa',
    lastName: '',
    email: 'pippa@gmail.com',
    passwordHash: 'pippapass',
    permissions: {
      roleMask: USER_ROLE,
      userMask: ADD_USER | READ_OTHER_USER | READ_SELF_USER | UPDATE_USER,
    },
  },
  {
    id: 'ed2d8fcf-c1d4-4688-96ab-79ffe3664604',
    firstName: 'deka',
    lastName: '',
    passwordHash: 'dekapass',
    email: 'deka@gmail.com',
    permissions: {
      roleMask: USER_ROLE,
      userMask: ADD_USER | READ_OTHER_USER | READ_SELF_USER | UPDATE_USER,
    },
  },
];

export { userSamples };
