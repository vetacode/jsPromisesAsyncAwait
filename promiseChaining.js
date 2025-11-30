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

//with arrow function
{
  new Promise((resolve, reject) => setTimeout(resolve(1), 1000))
    .then(
      (result) =>
        new Promise((resolve, reject) =>
          setTimeout(() => resolve(result * 2), 1000)
        )
    )
    .then((result) => result * 2);
}

//example with loaded script
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

loadScript('/article/promise-chaining/one.js')
  .then((script) => loadScript('/article/promise-chaining/two.js'))
  .then((script) => loadScript('/article/promise-chaining/three.js'))
  .then((script) => {
    // scripts are loaded, we can use functions declared there
    one();
    two();
    three();
  })
  .catch(console.error);
