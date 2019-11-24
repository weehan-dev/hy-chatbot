import express from 'express';
import facility from './facility';
import meal from './univDiet';
import librarySeat from './librarySeats';

const router = express.Router();

router.use('/facility', facility);
router.use('/diet', meal);
router.use('/library-seats', librarySeat);

export default router;