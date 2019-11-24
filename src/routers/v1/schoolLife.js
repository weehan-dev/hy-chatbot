import express from 'express';
import handleWeather from '../../services/serProvideWeather';

const router = express.Router();


router.post('/weather', async (req, res) => {
    res.json(await handleWeather());
  });

export default router;