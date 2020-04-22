import db from '../config';
import knex from 'knex';

const knexConfig = {
  client: 'pg',
  connection: db,
  migrations: {
    directory: `${__dirname}/migrations/`,
  },
  pool: {
    min: 2,
    max: 10,
  },
};

const runMigrations = async () => {
  try {
    const knexInstance = knex(knexConfig);
    await knexInstance.migrate.latest();
    console.log('finished migrations');
    await knexInstance.destroy();
    return process.exit(0);
  } catch (e) {
    console.log('migration failed: ', e);
    return process.exit(1);
  }
};

runMigrations();

module.exports = runMigrations;
