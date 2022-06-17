console.time('time');


console.log('평범한 로그 ');
console.error('에러 메세지 ');

// 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 표현된다. 
console.table([
    {name: 'Amy', birth: 1994},
    {name: 'Jason', birth: 1987},
    {name: 'Tom', birth: 2004}
]);


let obj = {
    outsie: {
        inside: {
            key: 'value'
        }
    }
};

// 객체를 콘솔에 표시할 때 사용한다. 
console.dir(obj, {colors: true, depth: 1});
console.dir(obj, {colors: true, depth: 2});

console.time('check');

for (let index = 0; index < 10000; index++) {    

}

console.timeEnd('check');
console.timeEnd('time');
