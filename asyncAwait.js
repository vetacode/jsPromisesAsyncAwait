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
  async function fetchAvatar() {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();

    let gitHubResponse = await fetch(
      `https://api.github.com/users/${user.name}`
    );
    let gitHubUser = await gitHubResponse.json();

    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.append(img);

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    img.remove;

    return gitHubUser;
  }

  fetchAvatar();
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
