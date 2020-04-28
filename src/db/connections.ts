import config from '../config';
const { db } = config;
import { logInfo } from '../common/logger';
import pgPromise from 'pg-promise';
import { camelize } from 'humps';

const camelizeKeys = (data: any) => {
  Object.keys(data).forEach(key => {
    const camelized = camelize(key);
    if (camelized !== key) {
      data[camelized] = data[key];
      delete data[key];
    }
  });
};

const pgPromiseOptions: any = {
  receive: (data: any) => data.forEach(camelizeKeys),
};

const pgOptions = {
  host: db.baseurl,
  password: db.password,
  user: db.username,
  database: db.database,
};

const postgresConnection = pgPromise(pgPromiseOptions)(pgOptions);

export { postgresConnection };
