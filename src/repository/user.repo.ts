import { User } from '../models/user/user.model';
import { postgresConnection as conn } from '../db/connections';
import { makeUpdateStatement } from '../common/sql-helpers';
import { userSamples } from '../test/samples/user.sample';
import { UpdateUser } from '../models/user/update-user.dto';

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

const updateUser = async (user: UpdateUser): Promise<User> => {
  const updatedUser = await conn.oneOrNone(
    `${makeUpdateStatement(user, null, 'users')} WHERE id = $/id/ RETURNING *`,
    user
  );
  return updatedUser;
};

const addUser = async (user: User) => {
  const userToInsert = {
    ...user,
    permissions: JSON.stringify(user.permissions),
  };
  const addedUser = await conn.one(
    `
    INSERT INTO public.users (id, first_name, last_name, email, password_hash, permissions)
    VALUES (
      $/id/,
      $/firstName/,
      $/lastName/,
      $/email/,
      $/passwordHash/,
      $/permissions/
    )
    RETURNING *
  `,
    userToInsert
  );
  return addedUser;
};

export { getOneUserById, getAllUsers, getUserByEmail, updateUser, addUser };
