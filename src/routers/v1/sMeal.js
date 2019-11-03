import express from 'express';
import serGetSMealResponse from '../../services/serGetSMealResponse';
import serMakeSMealResponse from '../../services/serMakeResponse';

const router = express.Router();

router.get('/get', (req, res) => {
  serGetSMealResponse(req.query.time).then(function (text) {
    // 성공시
    let returnToSkill = serMakeSMealResponse(text);
    
    res.json(returnToSkill);
  }, function (error) {
    // 실패시 
    console.error(2);
    res.json(error);
  });

});

export default router;
