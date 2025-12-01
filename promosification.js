'use strict';

{
  // function loadScript(src, callback) {
  //   let script = document.createElement('script');
  //   script.src = src;
  //   script.onload = () => callback(null, script);
  //   script.onerror = () => callback(new Error(`Script load error for ${src}`));
  //   document.head.append(script);
  // }
  // usage:
  // loadScript('path/script.js', (err, script) => {...})
}

// use promisification

{
  let loadScriptPromise = function (src) {
    return new Promise((resolve, reject) => {
      loadScript(src, (err, script) => {
        if (err) reject(err);
        else resolve(script);
      });
    });
  };

  // usage:
  // loadScriptPromise('path/script.js').then(...)
}

{
  //promisify(f): it accepts a to-promisify function f and returns a wrapper function.
  function promisify(f) {
    return function (...args) {
      // return a wrapper-function (*)
      return new Promise((resolve, reject) => {
        function callback(err, result) {
          // our custom callback for f (**)
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }

        args.push(callback); // append our custom callback to the end of f arguments

        f.call(this, ...args); // call the original function
      });
    };
  }

  // usage:
  let loadScriptPromise = promisify(loadScript);
  loadScriptPromise().then();
}
