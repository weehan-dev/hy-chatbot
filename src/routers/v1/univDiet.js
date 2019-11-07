import express from 'express';
import {fetchDietData, dietTextBuilder, dietDataBuilder} from '../../services/serUnivDiets'
const router = express.Router();


router.get('', async (req, res) => {
	try {
		const result = await fetchDietData(req.query.time );
		
		const text = dietTextBuilder(result)
		
		const ret = dietDataBuilder(text, req.query.version);

		res.json(ret);
	} catch (e) {
		res.send(e)
	}
});

export default router;
