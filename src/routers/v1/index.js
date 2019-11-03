import express from 'express';
import facility from './facility';
import sMeal from './sMeal';

const router = express.Router();

router.use('/facility', facility);
router.use('/sMeal', sMeal);


export default router;