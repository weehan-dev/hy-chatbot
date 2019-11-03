import express from 'express';
import facility from './facility';
import sMeal from './sMeal';
import libSeat from './libSeat';

const router = express.Router();

router.use('/facility', facility);
router.use('/sMeal', sMeal);
router.use('/libSeat', libSeat);

export default router;