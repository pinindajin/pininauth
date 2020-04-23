import { postgresConnection as conn } from '../db/connections';

export const truncateUsers = async () => {
  await conn.none(`TRUNCATE TABLE public.users`);
};
