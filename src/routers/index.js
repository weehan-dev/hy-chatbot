import express from 'express';
import api from './v1';

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


router.use('', api);

export default router;
