'use strict';

//.THEN handler chaining
//every call to a .then returns a new promise

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    //it creates new promise
    console.log(result); //1
    return result * 2;
  })
  .then(function (result) {
    console.log(result); //2
    return result * 2;
  })
  .then(function (result) {
    console.log(result); //4
    return result * 2;
  });

//Returning promises: allows to build chains of asynchronous actions.

{
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  })
    .then(function (result) {
      console.log(result); // 1
      return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(result * 2), 2000);
      });
    })
    .then(function (result) {
      console.log(result); //2
      return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(result * 2), 3000);
      });
    })
    .then(function (result) {
      console.log(result); //4
    });
}
