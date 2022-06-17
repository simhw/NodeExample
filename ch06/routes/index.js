const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
    next('route');    // 주소가 일치하는 다음 라우터 호출 
}, function (req, res, next) {
    console.log('실행되지 않음');
    next();
}, function (req, res, next) {
    console.log('실행되지 않음');
    next();
});

router.get('/', function (req, res, next) {
    res.send('Hello Router');
});

module.exports = router;
