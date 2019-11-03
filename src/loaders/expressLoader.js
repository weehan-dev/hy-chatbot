import express from 'express';
import configs from '../configs';
import api from '../routers';

console.log(configs.ENV);

export default (app) => {
  app.set('port', configs.PORT);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', api);
};
