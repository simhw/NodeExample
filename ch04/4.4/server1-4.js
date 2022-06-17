
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert: await fs.readFile('/인증서 경로'),
    key: await fs.readFile('/비밀키 경로'),
    ca: [
        await fs.readFile('/상위 인증서 경로'),
        await fs.readFile('/상위 인증서 경로'),
    ]
}, function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello Server</p>');
}).listen(443, function () {
    console.log('443 포트에서 서버 대기 중입니다.');
});