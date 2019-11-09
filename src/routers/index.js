import express from 'express';
import api from './v1';
import handleWeather from '../services/serProvideWeather';

const router = express.Router();

router.post('/test', (req, res) => {
  console.log(req);
  res.json({
    message: 'test'
  });
});

router.get('/health', (req, res) => {
  res.json({ message: 'server is on' });
});

router.post('/weather', (req, res) => {
  console.log(req);
  res.json(handleWeather());
});

router.use('/api', api);
export default router;
