import express from 'express';
import facility from './facility';
import sMeal from './univDiet';
import libSeat from './librarySeats';

const router = express.Router();

router.use('/facility', facility);
router.use('/diet', sMeal);
router.use('/libSeat', libSeat);

export default router;