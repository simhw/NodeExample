const express = require('express');

const router = express.Router();

// 같은 주소지만 메서드가 다른 코드가 있을 때 

router.route('/:id')
    .get(function (req, res) {
        console.log(req.params);
        console.log(req.query);
        res.send('GET /user');
    })
    .post(function (req, res, next) {
        res.send('POST /user');
    })
    .delete(function (req, res, next) {
        req.send('DELETE /user');
    })
    .put(function (req, res, next) {
        req.send('PUT /user');
    })

module.exports = router;
