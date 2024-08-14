console.log('console');

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("Promise - first handler");
  })
  .then(function () {
    console.log("Promise - second handler");
  });
for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------

// Output: console
// Output: forLoop
// Timer setTimeout finished
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise - first handler, Promise - second handler]
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise - first handler
// Output: Promise - second handler

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

---------------------- The End ----------------------
*/



// Output summary
/*
console
forLoop
Promise - first handler
Promise - second handler
setTimeout
*/
