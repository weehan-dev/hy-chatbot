import express from 'express';
import {fetchDietData, dietDataBuilder} from '../../services/serUnivDiets'
const router = express.Router();


router.get('', async (req, res) => {
	try {
		const result = await fetchDietData(req.query.time, req.query.version);
		const ret = dietDataBuilder(result['data'], result['version']);
		res.json(ret);
	} catch (e) {
		res.send(e)
	}
});

export default router;
