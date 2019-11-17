import express from 'express';
import getWeather from '../../services/serProvideWeather';

const router = express.Router();


router.post('/weather', (req, res) => {
    console.log(req);
    res.json(getWeather());
  });

export default router;