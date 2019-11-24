import express from 'express';
import facility from './facility';
import meal from './univDiet';
import librarySeat from './librarySeats';
import campusLife from './campusLife';

const router = express.Router();

router.use('/facility', facility);
router.use('/diet', meal);
router.use('/library-seats', librarySeat);
router.use('/campus-life', campusLife);

export default router;
