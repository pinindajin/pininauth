CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE IF NOT EXISTS users (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      email text NOT NULL,
      password_hash text NOT NULL,
      first_name text NULL,
      last_name text NULL,
      CONSTRAINT "PK_d862311c568d175c26f41bc8d87" PRIMARY KEY ("id")
  );

  ALTER TABLE users ADD UNIQUE (email);