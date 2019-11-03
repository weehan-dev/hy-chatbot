import express from 'express';

const router = express.Router();

router.post('ATM', (req, res) => {
  console.log(req);
  res.json('test');
});

export default router;
