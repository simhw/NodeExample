const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 문자열을 객체 형식으로 바꾸는 함수 
const parseCookies = (cookie = '') =>
    cookie.split(';').map(v => v.split('=')).reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

const session = {};

http.createServer(async function (req, res) {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        // 쿠키 유효 시간을 현재시간 + 1분으로 설정
        expires.setMinutes(expires.getMinutes() + 1);

        const uniqueInt = Date.now;
        session[uniqueInt] = {
            name,
            expires
        };
        res.writeHead(302, { Location: '/', 'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, });
        res.end();
    }
    //세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면 
    else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    }
    else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
}).listen(8085, function() {
    console.log('8085번 포트에서 서버 대기 중입니다.')
})