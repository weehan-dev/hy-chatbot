import express from 'express';
import {fetchSeatData, seatTextBuilder, seatDataBuilder} from '../../services/serLibrarySeats';

const router = express.Router();


router.get('', async (req, res) => {
	try {
		const result = await fetchSeatData();

		const text = seatTextBuilder(result)
		
		const ret = seatDataBuilder(text, req.query.version);
		
		res.json(ret);
	} catch (e) {
		res.send(e)
	}
});

export default router;