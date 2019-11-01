import express from 'express';
import facility from './facility';

const router = express.Router();

router.use('facility', facility);

export default router;
