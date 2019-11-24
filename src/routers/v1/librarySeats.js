import express from 'express';
import serLibrarySeats from '../../services/serLibrarySeats';

const router = express.Router();

router.post('', async (req, res) => {
	try {
		const result = await serLibrarySeats.fetchSeatData();


		const text = serLibrarySeats.seatTextBuilder(result)
		
		const ret = serLibrarySeats.seatDataBuilder(text, req.query.version);
		
		res.status(200).send(ret)

	} catch (e) {
		res.status(200).send('error');

	}
});

export default router;
