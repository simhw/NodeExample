const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

router.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', function (req, res) {
    res.render('profile', {title: '내 정보 - NodeBird'});
});

router.get('/join', async function (req, res) {
    const {email, nick, password} = req.body;
    try {
        
    } catch (error) {
        
    }
    res.render('join', {title: '회원가입 - NodeBird'});
});

router.get('/', function (req, res, next) {
    const twits = [];
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
});

module.exports = router;
