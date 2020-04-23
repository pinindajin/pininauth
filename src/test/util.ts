import { postgresConnection as conn } from '../db/connections';
import { addUser } from '../repository/user.repo';
import config from '../config';
import jwt from 'jsonwebtoken';
import { JWTUser } from '../models/user/jwt-user';
import { User } from '../models/user/user.model';

export const truncateUsers = async () => {
  await conn.none(`TRUNCATE TABLE public.users`);
};

export const insertUserAndGetJWT = async (
  user: User = {
    id: 'cc6b7dfc-99c8-4084-a976-510c077a1517',
    email: 'defaulttest@gmail.com',
    passwordHash: 'default-test-password-hash',
    firstName: 'default-test-first-name',
    lastName: 'default-test-last-name',
  }
): Promise<string> => {
  await addUser(user);

  const jwtUser: JWTUser = {
    userId: user.id,
    email: user.email,
  };

  const jwtToken = jwt.sign({ jwtUser }, config.jwt.secret, {
    expiresIn: '1h',
  });

  return jwtToken;
};
