import express from 'express';
import serGetSMealResponse from '../../services/serGetSMealResponse';
import serMakeSMealResponse from '../../services/serMakeResponse';

const router = express.Router();

router.get('/get', (req, res) => {
  serGetSMealResponse(req.query.time, req.query.version).then(function (text) {
    // 성공시
    let returnToSkill = serMakeSMealResponse(text[0], text[1]);

    res.json(returnToSkill);
  }, function (error) {
    // 실패시 
    console.error(2);
    res.json(error);
  });

});

export default router;
