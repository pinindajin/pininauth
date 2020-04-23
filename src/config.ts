const MISSING_CONFIG_VALUE = 'MISSING_CONFIG_VALUE';

type DBConfig = {
  username: string;
  password: string;
  database: string;
  baseurl: string;
};

const db: DBConfig = {
  username: process.env.PININ_POSTGRESQL_USERNAME || MISSING_CONFIG_VALUE,
  password: process.env.PININ_POSTGRESQL_PASSWORD || MISSING_CONFIG_VALUE,
  database: process.env.PININ_POSTGRESQL_DATABASE || MISSING_CONFIG_VALUE,
  baseurl: process.env.PININ_POSTGRESQL_BASEURL || MISSING_CONFIG_VALUE,
};

type JWTConfig = {
  secret: string;
  expiration: string;
};

const jwt: JWTConfig = {
  secret: process.env.PININ_JWT_SECRET || MISSING_CONFIG_VALUE,
  expiration: process.env.PININ_JWT_EXP || MISSING_CONFIG_VALUE,
};

const config = {
  db,
  jwt,
};

// TODO better validation + testing

const validateConfigValues = (configSubObject: any) => {
  Object.keys(configSubObject).forEach(key => {
    if (configSubObject[key] === MISSING_CONFIG_VALUE) {
      throw new Error(`Config validation failed. Missing value for ${key}`);
    }
  });
};

const validateConfig = (configObject: any) => {
  Object.keys(configObject).forEach(validateConfigValues);
};

validateConfig(config);

export default config;
