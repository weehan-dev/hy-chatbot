import express from 'express';
import Weather from '../../services/serProvideWeather';

const router = express.Router();


router.post('/weather', async (req, res) => {
    res.json(await Weather());
  });

export default router;