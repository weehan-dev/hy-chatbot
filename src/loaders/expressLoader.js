import configs from '../configs';

export default (app) => {
  app.set('port', configs.PORT);
};
