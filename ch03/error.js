const fs = require('fs');
const fspromise =  require('fs').promises;

// setInterval(() => {
//     console.log("setInterval start");
//     try {
//         throw new Error("server error!!!!");
//     } catch (err) {
//         console.error(err);
//     }
// }, 1000);

// setInterval(() => {
//     fs.unlink('./abcdef.js', function (err) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     // Error: ENOENT: no such file or directory
//     // 노드 내장 모듈의 에러는 실행중인 프로세스를 멈추지 않음 
// }, 1000);

setInterval(function () {
    fspromise.unlink('./abcdefg.js')
}, 1000);