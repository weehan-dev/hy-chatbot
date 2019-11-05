import express from 'express';
import {fetchSeatData, seatDataBuilder} from '../../services/serLibrarySeats';

const router = express.Router();


router.get('', async (req, res) => {
	try {
		const result = await fetchSeatData(req.query.version);
		const ret = seatDataBuilder(result['libseat'], result['version']);
		res.json(ret);
	} catch (e) {
		res.send(e)
	}
});

export default router;
