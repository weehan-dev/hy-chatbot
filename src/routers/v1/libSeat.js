import express from 'express';
import serGetLibSeat from '../../services/serGetLibSeat';
import serMakeLibSeat from '../../services/serMakeLibSeat';

const router = express.Router();

router.get('/get', (req, res) => {

    serGetLibSeat(req.query.version).then(function (text) {
        // 성공시
        const lib = serMakeLibSeat(text[0], text[1]);

        res.json(lib);
      }, function (error) {
        // 실패시
        res.send(error);
      });

});

export default router;
