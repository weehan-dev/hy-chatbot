import express from 'express';
import facility from './facility';
import school from './schoolLife';

const router = express.Router();

router.use('facility', facility);
router.use('/school', school);

export default router;
