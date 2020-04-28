import { RouterContext } from '@koa/router';
import { LoginUserDTO, validateLoginUser } from '../models/user/login-user.dto';
import { getUserByEmail } from '../repository/user.repo';
import { isError } from '../common/failable';
import argon2 from 'argon2';
import { getJwtFromUser } from '../common/jwt';

const loginHandler = async (ctx: RouterContext) => {
  console.log('🐤 loginHandler');
  const user: LoginUserDTO = ctx.request.body.user;
  console.log('🐤 user', user);

  const validateResult = validateLoginUser(user);

  if (isError(validateResult)) {
    ctx.response.status = 400;
    return;
  }

  const userRecord = await getUserByEmail(user.email);

  if (!userRecord) {
    ctx.response.status = 404;
    return;
  }

  const isCorrectPassword = await argon2.verify(
    userRecord.passwordHash,
    user.password
  );

  if (!isCorrectPassword) {
    ctx.response.status = 401;
    return;
  }

  const token = getJwtFromUser(userRecord);

  ctx.response.status = 200;
  ctx.response.body = {
    token,
  };
};

export { loginHandler };
