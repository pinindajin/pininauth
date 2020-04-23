import { truncateUsers } from './util';

const setup = async () => {
  await truncateUsers();
};

export default setup;
