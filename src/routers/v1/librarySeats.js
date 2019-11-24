import express from 'express';
import serLibrarySeats from '../../services/serLibrarySeats';

const router = express.Router();


router.get('', async (req, res) => {
	try {
		const result = await serLibrarySeats.fetchSeatData();

		const text = serLibrarySeats.seatTextBuilder(result)
		
		const ret = serLibrarySeats.seatDataBuilder(text, req.query.version);
		
		res.status(200).send(ret)

	} catch (e) {

		res.send(e)

	}
});

export default router;