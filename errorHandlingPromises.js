'use strict';

fetch('https://nowebsitehere.com')
  .then((res) => res.json())
  .catch((err) => {
    console.log(err.message);
  });

console.log(1 == '1');
