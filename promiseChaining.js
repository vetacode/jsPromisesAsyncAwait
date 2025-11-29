'use strict';

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); //1
    return result * 2;
  })
  .then(function (resolve) {
    console.log(resolve); //2
    return resolve * 2;
  })
  .then(function (resolve) {
    console.log(resolve); //4
    return resolve * 2;
  });
