const buffer1 = Buffer.from('change to buffer');

// 문자열을 버퍼로 바꿔준다. 
console.log('from(): ', buffer1);
console.log('length: ', buffer1.length);
console.log('toString(): ', buffer1.toString());

const arr = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기 ')];

// 배열 안에 든 버퍼들을 하나로 합친다. 
const buffer2 = Buffer.concat(arr);
console.log('concat(): ', buffer2.toString());

// 해당 크기의 빈 버퍼를 생성한다. 
const buffer3 = Buffer.alloc(5);
console.log('alloc(): ', buffer3);