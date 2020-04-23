import { truncateUsers } from './util';

const cleanup = async () => {
  await truncateUsers();
};

export default cleanup;
