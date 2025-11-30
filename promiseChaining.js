'use strict';

//.THEN handler chaining
//every call to a .then returns a (not exactly) new promise (then-able object to be precise)
//“thenable” object is an arbitrary object that has a method .then. It will be treated the same way as a promise.

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
    .then((result) => {
      console.log(result), //1
        new Promise((resolve, reject) =>
          setTimeout(() => resolve(result * 2), 1000)
        );
    })
    .then((result) => result * 2);
}

//example with loaded script
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    // let script = document.createElement('script');
    // script.src = src;
    // script.onload = () => resolve(script);
    // script.onerror = () => reject(new Error(`Script load error for ${src}`));
    // document.head.append(script);
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

//THENABLE OBJ
class thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve); //function() {native code}
    setTimeout(() => resolve(this.num), 1000);
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new thenable(`this is the result of line 96: ${result}`);
  })
  .then(console.log);

//Bigger example: fetch
//Basic Syntax: let promise = fetch(url);

fetch('/article/promise-chaining/user.json')
  // .then below runs when the remote server responds
  .then(function (response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function (text) {
    // ...and here's the content of the remote file
    console.log(text); // {"name": "iliakan", "isAdmin": true}
  });

//Fetch to github example
// Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then((response) => response.json())
  // Make a request to GitHub
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then((response) => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then((githubUser) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });

//Should be like this:
fetch('/article/promise-chaining/user.json')
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise(function (resolve, reject) {
        // (*)
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = 'promise-avatar-example';
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser); // (**)
        }, 3000);
      })
  )
  // triggers after 3 seconds
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));

//Make the function reusable
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Use them:
loadJson('/article/promise-chaining/user.json')
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
// ...

/**TASK
 * Promise: then versus catch
Are these code fragments equal? In other words, do they behave the same way in any circumstances, for any handler functions?

promise.then(f1).catch(f2);
Versus:

promise.then(f1, f2);
 */
//Answer: NO

promise.then(f1).catch(f2); //in this code, the error happens in f1 will be cathced by f2
//but thats not the case in code below
promise.then(f1, f2);
