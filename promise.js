'use strict';

//PROMISE is the best solution of Callback Hell/Pyramid of doom
//SYNTAX:
let promise = new Promise(function (resolve, reject) {
  // executor (the producing code, "singer")
});

{
  //Resolved/fulfilled example
  let promise = new Promise(function (resolve, reject) {
    // the function is executed automatically when the promise is constructed

    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve('done'), 1000);
  });

  promise.then((value) => {
    console.log(value); // done
  });
}

{
  //Error example
  let promise = new Promise(function (resolve, reject) {
    // after 1 second signal that the job is finished with an error
    // setTimeout(() => reject(new Error('Whoops!')), 1000);//Whoops!
  });

  promise.then((value) => {
    console.log(value);
  });
}

{
  //There is only one result (resolve or reject), others will be ignored
  //resolve/reject expect only one argument (or none) and will ignore additional arguments.
  let promise = new Promise(function (resolve, reject) {
    resolve('done');

    reject(new Error('…')); // ignored
    setTimeout(() => resolve('…')); // ignored
  });
}

{
  //This can be done: have immediately have a resolved promise
  let promise = new Promise(function (resolve, reject) {
    // not taking our time to do the job
    resolve(123); // immediately give the result: 123
  });
}

//CONSUMING the promise results: .THEN, .CATCH
//Syntax:
/* 
  promise.then(
    function(result) { /handle a successful result / },
    function(error) { / handle an error / }
    );
  */

//THEN
{
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('done!'), 1000);
  });

  // resolve runs the first function in .then
  promise.then(
    (result) => console.log(result), // shows "done!" after 1 second
    (error) => console.log(error) // doesn't run
  );
}

/*
{
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('Whoops!')), 1000);
  });

  // reject runs the second function in .then
  promise.then(
    (result) => console.log(result), // doesn't run
    (error) => console.log(error) // shows "Error: Whoops!" after 1 second
  );
}
*/
//CATCH
//Syntax:
//.then(null, errorHandlingFunction) = .then(f)
//.catch(errorHandlingFunction)

/*
{
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Whoops! Rejected again!')), 1000);
  });

  // .catch(f) is the same as promise.then(null, f)
  promise.catch((value) => console.log(value)); // shows "Error: Whoops!" after 1 second
}
  */

//Cleanup: finally
//Syntax: .finally(f)
{
  new Promise((resolve, reject) => {
    /* do something that takes time, and then call resolve or maybe reject */
  });
  // runs when the promise is settled, doesn't matter successfully or not
  // .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
  // .then(result => show result, err => show error)
}

{
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('value'), 2000);
  })
    .finally(() => console.log('Promise ready')) // triggers first
    .then((result) => console.log(result)); // <-- .then shows "value"
}
/*
{
  new Promise((resolve, reject) => {
    throw new Error('error');
  })
    .finally(() => console.log('Promise ready')) // triggers first
    .catch((err) => console.log(err)); // <-- .catch shows the error
}
*/
{
  // the promise becomes resolved immediately upon creation
  let promise = new Promise((resolve) => resolve('done! line 135'));

  promise.then(console.log); // done! (shows up right now)
  // promise.then((value) => console.log(value)); // done! (shows up right now)
}

/**TASK 1
 * Re-resolve a promise?
What’s the output of the code below?

let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
 */
{
  let promise = new Promise(function (resolve, reject) {
    resolve(1);

    setTimeout(() => resolve(2), 1000); // The second call to resolve is ignored, because only the first call of reject/resolve is taken into account. Further calls are ignored.
  });

  promise.then(console.log);
}
