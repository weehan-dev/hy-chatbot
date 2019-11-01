import databaseLoader from './databaseLoader';
import expressLoader from './expressLoader';

const loaders = async (app) => {
  await databaseLoader();
  expressLoader(app);
};

export default loaders;
