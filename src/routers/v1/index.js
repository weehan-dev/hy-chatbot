import express from 'express';
import facility from './facility';
import livingPoint from './schoolLife';

const router = express.Router();

router.use('facility', facility);
router.use('/livingPoint', livingPoint);

export default router;
