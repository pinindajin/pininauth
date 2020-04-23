import koaJwt from 'koa-jwt';
import config from '../config';
const { jwt } = config;

export const jwtMiddleware = koaJwt({ secret: jwt.secret });
