import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import configs from '../configs';
import api from '../routers';

export default (app) => {
  app.set('port', configs.PORT);
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger('dev'));
  app.use('/api', api);
};
