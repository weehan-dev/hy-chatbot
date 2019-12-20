import express from 'express';
import handleWeather from '../../services/serProvideWeather';
import handleWeather2 from '../../services/serProvideTestWeather';

const router = express.Router();


router.post('/weather', async (req, res) => {
  const data = await handleWeather();
  res.json(data);
});

// 배포 여러 번 하기 귀찮아서 한 번에 확인하는 용도의 함수.
// 지워질 예정
router.post('/weather2', async (req, res) => {
  const data = await handleWeather2();
  res.json(data);
});

export default router;
