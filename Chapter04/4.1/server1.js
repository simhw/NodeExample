const http = require('http');

http.createServer(function (req, res) {
    // header
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // body
    res.write('<h1>Hello World!</h1>');
    // end 
    res.end('<p>Hello Server!</p>');
}).listen(8080, function () {    // 서버 연결 
    console.log('8080 포트에서 서버 대기 중입니다.');
});

// 한 번에 여러 서버 실행 가능 
const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello Server!</p>');
});

server.listen(9090);

// listen 메서드에 콜백 함수를 넣는 대신 listening 이벤트 리스너 추가 
server.on('listening', function () {
    console.log('9090 포트에서 서버 대기 중입니다.');
});

server.on('error', function (err) {
    console.error(err);
});

