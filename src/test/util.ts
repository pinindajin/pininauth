import { postgresConnection as conn } from '../db/connections';
import { addUser } from '../repository/user.repo';
import config from '../config';
import jwt from 'jsonwebtoken';
import { JWTUser } from '../models/user/jwt-user';
import { User } from '../models/user/user.model';
import { USER_ROLE } from '../common/permissions/role';
import {
  ADD_USER,
  READ_OTHER_USER,
  READ_SELF_USER,
  UPDATE_USER,
} from '../common/permissions/user';

export const truncateUsers = async () => {
  await conn.none(`TRUNCATE TABLE public.users`);
};

export const insertUserAndGetJWT = async (
  user: Partial<User> = {}
): Promise<string> => {
  const defaultUser = {
    id: 'cc6b7dfc-99c8-4084-a976-510c077a1517',
    email: 'defaulttest@gmail.com',
    passwordHash: 'default-test-password-hash',
    firstName: 'default-test-first-name',
    lastName: 'default-test-last-name',
    permissions: {
      roleMask: USER_ROLE,
      userMask: ADD_USER | READ_OTHER_USER | READ_SELF_USER | UPDATE_USER,
    },
  };
  const newUser = Object.assign(defaultUser, user);

  await addUser(newUser);

  const jwtUser: JWTUser = {
    userId: newUser.id,
    email: newUser.email,
  };

  const jwtToken = jwt.sign({ ...jwtUser }, config.jwt.secret, {
    expiresIn: '1h',
  });

  return jwtToken;
};
