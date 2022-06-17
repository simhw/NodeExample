async function add(a, b) {
    return a + b;
}

async function callAdd() {
  const result = await add(1, 2);
  console.log("async ", result); // 3
  return result;
};

function waitSec() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
}

async function timer() {
    // await 대기 중에 다른 Event Loop 함수 스코프가 실행될 수 있습니다.
    await waitSec();
    console.log(new Date);
    await waitSec();
    console.log(new Date);
    await waitSec();
    console.log(new Date);
};

callAdd().then(result => console.log("then ", result));

timer();
timer();
timer();
