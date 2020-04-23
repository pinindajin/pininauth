import { truncateUsers } from './util';
import { addUser } from '../repository/user.repo';
import config from '../config';
import jwt from 'jsonwebtoken';
import { JWTUser } from '../models/user/jwt-user';
import { User } from '../models/user/user.model';

const setup = async () => {
  await truncateUsers();

  const user: User = {
    id: 'cc6b7dfc-99c8-4084-a976-510c077a1517',
    email: 'testadmin@test.com',
    passwordHash: 'EMPTY_NOT_NEEDED',
    firstName: '',
    lastName: '',
  };

  await addUser(user);

  const jwtUser: JWTUser = {
    userId: user.id,
    email: user.email,
  };

  const jwtToken = jwt.sign({ jwtUser }, config.jwt.secret, {
    expiresIn: '1h',
  });

  // @ts-ignore
  global.__JWT_TOKEN__ = jwtToken;
};

export default setup;
