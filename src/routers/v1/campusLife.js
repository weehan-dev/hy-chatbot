import express from 'express';
import handleWeather from '../../services/serProvideWeather';
import getURL from '../../services/utils/weather/getURL';


const router = express.Router();


router.post('/weather', async (req, res) => {
  getURL();
  const data = await handleWeather();
  res.json(data);
});

export default router;
