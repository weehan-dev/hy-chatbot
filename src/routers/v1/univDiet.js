import express from 'express';
import serUnivDiets from '../../services/serUnivDiets'
const router = express.Router();


router.get('', async (req, res) => {
	try {
		const result = await serUnivDiets.fetchDietData(req.query.time );
		
		const text = serUnivDiets.dietTextBuilder(result)
		
		const ret = serUnivDiets.dietDataBuilder(text, req.query.version);
 
		res.status(200).send(ret)
		
	} catch (e) {
		res.send(e)
	}
});

export default router;
