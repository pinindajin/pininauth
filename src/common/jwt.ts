import { User } from '../models/user/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';
import { JWTUser } from '../models/user/jwt-user';

export const getJwtFromUser = (user: User): string => {
  const { secret, expiration } = config.jwt;
  const jwtUser: JWTUser = {
    userId: user.id,
    email: user.email,
  };

  return jwt.sign({ jwtUser }, secret, { expiresIn: expiration });
};
