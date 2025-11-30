'use strict';

fetch('https://nowebsitehere.com')
  .then((res) => res.json())
  .catch((err) => {
    console.log(err.message);
  });

console.log(1 == '1');

//Implicit try…catch
//.catch not only catches explicit rejections, but also accidental errors in the handlers
new Promise((resolve, reject) => {
  reject(new Error('WTF!!!'));
}).catch(console.error);

//Rethrowing
{
  // the execution: catch -> then
  new Promise((resolve, reject) => {
    throw new Error('Whoops!');
  })
    .catch(function (error) {
      console.log('The error is handled, continue normally');
    })
    .then(() => console.log('Next successful handler runs'));
}

{
  // the execution: catch -> catch
  new Promise((resolve, reject) => {
    throw new Error('Whoops!');
  })
    .catch(function (error) {
      // (*)

      if (error instanceof URIError) {
        // handle it
      } else {
        console.log("Can't handle such error");

        throw error; // throwing this or another error jumps to the next catch
      }
    })
    .then(function () {
      /* doesn't run here */
    })
    .catch((error) => {
      // (**)

      console.log(`The unknown error has occurred: ${error}`);
      // don't return anything => execution goes the normal way
    });
}

//Unhandled rejections
//In the browser we can catch such errors using the event unhandledrejection

/**
 * window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
 */
