const pgp = require('pg-promise')();
const { decamelize } = require('humps');

export const makeUpdateStatement = (updates: any, columns: any, table: any) => {
  const decamelized = Object.keys(updates).reduce((obj, key) => {
    const decamelized = decamelize(key);
    (obj as any)[decamelized] = updates[key];
    return obj;
  }, {});

  return pgp.helpers.update(decamelized, columns, table);
};
