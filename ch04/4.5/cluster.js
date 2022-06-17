// 싱글 프로세스로 동작하는 노드가 cpu 코어를 모두 사용할 수 있게 해주는 모듈 
// 노드 프로세스를 여러 개 둘 수도 있으므로, 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산 

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    console.log('CPU:',numCPUs);
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid} 번 워커가 종료되었습니다. code: ${code}, signal: ${signal}`);
        // 종료된 워커를 다시 실행 
        cluster.fork();
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        // 워커 존재를 확인하기 위해 1초마다 강제 종료
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(8086);

    console.log(`${process.pid} 번 워커 실행`);
}
