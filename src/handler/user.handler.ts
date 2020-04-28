import { RouterContext } from '@koa/router';
import {
  addUser,
  getAllUsers,
  getOneUserById,
  getUserByEmail,
  updateUser,
} from '../repository/user.repo';
import { User } from '../models/user/user.model';
import { isError } from '../common/failable';
import argon2 from 'argon2';
import { NewUserDTO, validateNewUserDTO } from '../models/user/new-user.dto';
import { v4 as uuid } from 'uuid';
import {
  UpdateUserDTO,
  validateUpdateUserDTO,
} from '../models/user/update-user.dto';
import { toUpdateUser } from '../common/user';
import { BASIC_USER, READ_OTHER_USER } from '../common/permissions/user';
import { USER_ROLE } from '../common/permissions/role';
import { hasPermissions } from '../common/permissions/permissions';

const getOneUserHandler = async (ctx: RouterContext) => {
  const userId: string = ctx.params.userId;
  const user = await getOneUserById(userId);
  if (!user) {
    ctx.response.status = 404;
    ctx.response.message = `Cannot find user ${userId}`;
  } else {
    ctx.response.body = user;
    ctx.response.status = 200;
  }
};

const getAllUsersHandler = async (ctx: RouterContext) => {
  const users = await getAllUsers();
  ctx.response.body = users;
  ctx.response.status = 200;
};

const updateUserHandler = async (ctx: RouterContext) => {
  const newUserData = ctx.request.body;
  const validateResult = validateUpdateUserDTO(newUserData);

  if (isError(validateResult)) {
    ctx.response.status = 400;
    return;
  }

  const userToUpdate = await toUpdateUser(newUserData);
  const updatedUser = await updateUser(userToUpdate);

  if (!updatedUser) {
    ctx.response.status = 404;
    ctx.response.message = `Cannot find user ${userToUpdate.id}`;
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { ...updatedUser, passwordHash: '<SENSITIVE>' };
};

const createUserHandler = async (ctx: RouterContext) => {
  const user: NewUserDTO = ctx.request.body.user;
  const validateResult = validateNewUserDTO(user);

  if (isError(validateResult)) {
    ctx.response.status = 400;
    return;
  }

  const matchingUsers = await getUserByEmail(user.email);
  if (matchingUsers) {
    ctx.response.status = 409;
    return;
  }

  const hashedPassword = await argon2.hash(user.password);
  let userToAdd = {
    id: uuid(),
    passwordHash: hashedPassword,
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    permissions: {
      roleMask: USER_ROLE,
      userMask: BASIC_USER,
    },
  };

  await addUser(userToAdd);

  ctx.response.status = 201;
};

export {
  updateUserHandler,
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
};
