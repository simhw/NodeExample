const http = require('http');

http.createServer(function(req, res) {
    console.log(req.url);
    console.log(req.headers.cookie);

    // 브라우저에 쿠키 값 저장 
    res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
    res.end('Hello Cookie');
}).listen(8083, function() {
    console.log('8083 포트에서 서버 대기 중입니다.');
});