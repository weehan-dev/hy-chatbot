import express from 'express';

import serUnivDiets from '../../services/serUnivDiets';

const router = express.Router();

router.post('', async (req, res) => {
	try {
		const result = await serUnivDiets.fetchDietData(req.query.time );
		
		const text = serUnivDiets.dietTextBuilder(result, req.query.time);

    const ret = serUnivDiets.dietDataBuilder(text, req.query.version);

    res.status(200).send(ret);
  } catch (e) {
    res.status(200).send('error');
  }
});

export default router;
