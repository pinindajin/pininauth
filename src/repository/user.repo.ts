import { v4 as uuid } from 'uuid';
import { User } from '../models/user/user.model';
import { postgresConnection as conn } from '../db/connections';
import { makeUpdateStatement } from '../util/sql-helpers';
import { userSamples } from '../test/samples/user.sample';

const testUsers: User[] = [...userSamples];

const getOneUserById = async (userId: string): Promise<User | null> => {
  const user = await conn.oneOrNone(
    `SELECT * FROM public.users WHERE id = $/userId/ LIMIT 1`,
    { userId }
  );

  return user;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await conn.oneOrNone(
    `SELECT * FROM public.users WHERE email = $/email/ LIMIT 1`,
    { email }
  );

  return user;
};

const getAllUsers = async () => {
  const users = await conn.manyOrNone(`SELECT * FROM public.users`);
  return users;
};

const updateUser = async (user: User) => {
  const updatedUser = await conn.oneOrNone(
    `${makeUpdateStatement(user, null, 'users')} WHERE id = $/id/ RETURNING *`,
    user
  );
  return updatedUser;
};

const addUser = async (user: User) => {
  const addedUser = await conn.one(
    `
    INSERT INTO public.users (id, first_name, last_name, email, password_hash)
    VALUES (
      $/id/,
      $/firstName/,
      $/lastName/,
      $/email/,
      $/passwordHash/
    )
    RETURNING *
  `,
    user
  );
  return addedUser;
};

export { getOneUserById, getAllUsers, getUserByEmail, updateUser, addUser };
