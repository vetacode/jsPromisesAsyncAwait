'use strict';

// 6 static methods in the Promise class:

//1. Promise.all: dipake klo kita butuh semua data sukses. klo satu gagal, semua operasi dianggap gagal (ga dapet hasilnya)
//to execute many Promises in parallel and wait until all of them are ready.
//Syntax: let promise = Promise.all(iterable);
//It returns a new promise

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig',
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) =>
  responses.forEach((response) =>
    console.log(`${response.url}: ${response.status}`)
  )
);

//Converting array of promise<Response> to json data
{
  let names = ['iliakan', 'remy', 'jeresig'];

  let requests = names.map((name) =>
    fetch(`https://api.github.com/users/${name}`)
  );

  Promise.all(requests)
    .then((responses) => {
      // all responses are resolved successfully
      for (let response of responses) {
        console.log(`${response.url}: ${response.status}`); // shows 200 for every url
      }

      return responses;
    })
    // map array of responses into an array of response.json() to read their content
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    // all JSON answers are parsed: "users" is the array of them
    .then((users) => users.forEach((user) => console.log(user.name)));
}

//it can also iterate not a promise objects, its passed resulting array as is
{
  Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 1000);
    }),
    2,
    3,
  ]).then(console.log); // [1, 2, 3]
}

//2. Promise.allSettled: dipake kalo kita butuh nampilin semua hasil nya, success ataupun error
//its used when we need 'all or none' results succesfully to proceed: will shows every success and error
//Semua promise akan tetap diproses sampai selesai walau ada yg error
{
  let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url',
  ];

  Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
    // (*)
    results.forEach((result, num) => {
      if (result.status == 'fulfilled') {
        console.log(`${urls[num]}: ${result.value.status}`);
      } else if (result.status == 'rejected') {
        console.log(`${urls[num]}: ${result.reason}`);
      }
    });
  });
}

//3. Promise.race: Ambil yang pertama diterima (paling cepat)
// klo kita butuh dapetin data yg paling cepet diterima, even if it success or reject.
//After the first settled promise “wins the race”, all further results/errors are ignored.
//Syntax: let promise = Promise.race(iterable);
{
  Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Whoops!')), 2000)
    ),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
  ]).then(console.log); // 1
}

//4. Promise.any: ambil yg pertama SUCCESS (sukses tercepat)
//Jika semuanya gagal → error AggregateError.
//Syntax:let promise = Promise.any(iterable);
{
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Whoops!')), 1000)
    ),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 2000)),
  ]).then(console.log); // 3
}

//error AggregateError.
{
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Ouch!')), 1000)
    ),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Error!')), 2000)
    ),
  ]).catch((error) => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ouch!
    console.log(error.errors[1]); // Error: Error!
  });
}

//5. Promise.resolve
//Promise.resolve(value) creates a resolved promise with the result value.
//SAME AS: let promise = new Promise(resolve => resolve(value));

//6. Promise.reject
//Promise.reject(error) creates a rejected promise with error.
//SAME AS: let promise = new Promise((resolve, reject) => reject(error));

//NOTES: Promise.resolve/reject will be replaced by Async/await for best practices
