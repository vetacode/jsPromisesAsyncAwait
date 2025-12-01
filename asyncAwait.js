'use strict';

//ASYNC
{
  async function f() {
    return console.log(1);
  }
  f().then(); //1
}

{
  async function f() {
    return 2;
  }
  f().then(console.log);
}

{
  async function f() {
    return Promise.resolve(3);
  }
  f().then(console.log);
}

//AWAIT
//// works only inside async functions
// let value = await promise;
{
  async function f() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('ASYNC DONE!'), 1000);
    });

    let result = await promise;
    console.log(result); //'ASYNC DONE'
  }

  f();
}
