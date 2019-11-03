import express from 'express';
import configs from '../configs';
import api from '../routers';

export default (app) => {
  app.set('port', configs.ENV === 'PROD' ? configs.PORT : 3000);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', api);
};
