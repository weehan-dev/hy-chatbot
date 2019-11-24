import express from 'express';
import handleWeather from '../../services/serProvideWeather';

const router = express.Router();


router.post('/weather', async (req, res) => {
  const data = await handleWeather();
  res.json(data);
});

export default router;
