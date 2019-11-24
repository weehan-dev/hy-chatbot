import express from 'express';

const router = express.Router();

router.get('', (req, res) => {
  const weather = serviceWeather.getWeather();
  const ret = serviceWeather.buildWeatherData(weather);
  res.json(ret);
});

export default router;
