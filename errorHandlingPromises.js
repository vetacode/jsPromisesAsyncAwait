'use strict';

fetch('https://nowebsitehere.com')
  .then((res) => res.json())
  .catch((err) => {
    console.log(err.message);
  });

console.log(1 == '1');

//Implicit try…catch
new Promise((resolve, reject) => {
  reject(new Error('WTF!!!'));
}).catch(console.error);
