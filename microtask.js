'use strict';

let promise = Promise.resolve();
promise.then(() => console.log('it logs later (Async) from .then'));

console.log('code finished');

{
  let promise = new Promise((resolve) => resolve());
  promise.then(() => console.log('using new Promise'));

  console.log('done');
}

//to make it return result in order:
{
  let promise = Promise.resolve();
  promise
    .then(() => console.log('logs from .then'))
    .then(() => console.log('code finished'));
}
