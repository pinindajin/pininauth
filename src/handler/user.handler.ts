import { RouterContext } from '@koa/router';
import {
  addUser,
  getAllUsers,
  getOneUserById,
  getUserByEmail,
  updateUser,
} from '../repository/user.repo';
import { User } from '../models/user.model';
import { isError } from '../util/failable';
import argon2 from 'argon2';
import { UserDTO, validateUserDTO } from '../models/new-user.dto';
import { v4 as uuid } from 'uuid';

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
  const userToUpdate: User = ctx.request.body;
  const updatedUser = await updateUser(userToUpdate);
  if (!updatedUser) {
    ctx.response.status = 404;
    ctx.response.message = `Cannot find user ${userToUpdate.id}`;
  } else {
    ctx.response.body = updatedUser;
  }
};

const createUserHandler = async (ctx: RouterContext) => {
  const user: UserDTO = ctx.request.body.user;
  const validateResult = validateUserDTO(user);

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
  const userToAdd = {
    id: uuid(),
    passwordHash: hashedPassword,
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
  };
  console.log('🐠 userToAdd', userToAdd);
  await addUser(userToAdd);

  ctx.response.status = 200;
};

export {
  updateUserHandler,
  createUserHandler,
  getAllUsersHandler,
  getOneUserHandler,
};
