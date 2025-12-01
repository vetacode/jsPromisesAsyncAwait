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

    let result = await promise; //the fn execution wait untill promise resolves
    console.log(result); //'ASYNC DONE'
  }

  f();
}

{
  // async function fetchAvatar() {
  //   let response = await fetch('/article/promise-chaining/user.json');
  //   let user = await response.json();
  //   let gitHubResponse = await fetch(
  //     `https://api.github.com/users/${user.name}`
  //   );
  //   let gitHubUser = await gitHubResponse.json();
  //   let img = document.createElement('img');
  //   img.src = githubUser.avatar_url;
  //   img.className = 'promise-avatar-example';
  //   document.body.append(img);
  //   await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  //   img.remove;
  //   return gitHubUser;
  // }
  // fetchAvatar();
}

//await accepts “thenables”
{
  class Thenable {
    constructor(num) {
      this.num = num;
    }
    then(resolve, reject) {
      console.log(resolve);
      // resolve with this.num*2 after 1000ms
      setTimeout(() => resolve(this.num * 2), 1000); // (*)
    }
  }

  async function f() {
    // waits for 1 second, then result becomes 2
    let result = await new Thenable(1);
    console.log(result);
  }

  f();
}

//Async class methods

class Waiter {
  async wait() {
    return await Promise.resolve('Waiting has done!');
  }
}

new Waiter().wait().then(console.log); //'Waiting has done!'

//Error handling
//using await will automatically throws error if its rejected
{
  async function f() {
    await Promise.reject(new Error('WTF!'));
  }
}
//same as: (Best Practice)
{
  async function f() {
    throw new Error('WTF!');
  }
}

//in the waiting we can catch the error using try..catch
{
  async function f() {
    try {
      let response = await fetch('http://no-such-url');
    } catch (err) {
      console.log(err); // TypeError: failed to fetch
    }
  }

  f();
}
//if we dont use try catch but there is error, just append .catch after calling the fn
{
  async function f() {
    let response = await fetch('http://no-such-url');
  }

  // f() becomes a rejected promise
  f().catch(console.log); // TypeError: failed to fetch // (*)
}

//async/await works well with Promise.all
// wait for the array of results
let url1 = 'https://example1.com';
let url2 = 'https://example2.com';
let results = await Promise.all([fetch(url1), fetch(url2)]);

/**TASK 1
 * Rewrite using async/await
Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch:

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
 */

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    let json = await response.json();
    return json;
  }
  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json').catch(console.log);
