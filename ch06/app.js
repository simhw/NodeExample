const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');

const app = express();

dotenv.config();    // ./env 파일을 읽어서 process.env 로 만듦

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.set('port', process.env.PORT || 3000);  // 서버가 실행될 포트 설정 
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use('/', express.static(path.join(__dirname, 'public')));   // 정적인 파일들을 제공하는 라우터 역할 

app.use(express.json());    // express 에 body-parser 일부 기능이 내장  
app.use(express.urlencoded({extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));   // 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듦

app.use(session({   // 세션 관리용 미들웨어  
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use(function(req, res, next) {  
    if (process.env.NODE_ENV === 'production') {
        morgan('combined')(req, res, next);     // logger 관리용 미들웨어 
    } else {
        morgan('dev')(req, res, next);
    }
});

// GET / 라우터 
app.use('/', indexRouter);
// GET /user 라우터 
app.use('/user', userRouter);

app.use(function (req, res, next) {    
    const error = new Error(`${req.method} ${req.url} Not Found `); 
    error.status = 404;
    next(error);
});

app.use(function (req, res, next) {     
    console.log('모든 요청에 다 실행');
    next();
});

app.get('/', function (req, res, next) {    // 주소에 대한 요청 처리 
    console.log('GET / 요청에서만 실행');
    next();     // 다음 미들웨어  
}, function (req, res) {
    throw new Error('에러는 에러 처리 미들웨어로');
});

app.get('/', function (req, res) {
    res.send('Hello express');
    res.sendFile(path.join(__dirname, '/Chapter06/index.html'));
});

app.use(function (err, req, res, next) {    // 에러 처리 미들웨어 
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV != 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// 포트 연결 및 서버 실행  
app.listen(app.get('port'), function () {
    console.log(app.get('port'), ' 포트에서 대기 중');
});

