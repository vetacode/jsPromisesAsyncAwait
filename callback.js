'use strict';
let loadScript = () => {
  return null;
};
loadScript('/my/script.js', function (script) {
  console.log(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript('/my/script2.js', function (script) {
    console.log(`Cool, the second script is loaded`);
  });
});
