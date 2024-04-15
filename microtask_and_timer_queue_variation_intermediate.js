console.log("begins");

setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("Promise 1");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("Promise 2 - start");
  setTimeout(function () {
    console.log("setTimeout 2");
    resolve("Promise 2 - resolve message");
  }, 0);
}).then((res) => {
  console.log("Promise 2");
  setTimeout(() => {
    console.log("setTimeout 3");
    console.log(res);
  }, 0);
});

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity with the timers


/*
----------------------Loop 1 - Start ----------------------

// Output: begins
// setTimeout 1 starts counting
// Promise constructor is executed and the promise is created
// Output: Promise 2 - start 
// setTimeout 2 starts counting
// Output: forLoop
// setTimeout 1 finished
// setTimeout 2 finished

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 1, setTimeout 2]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------

// Output: setTimeout 1
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [Promise 1]
- Microtask Others queue: []
- Timers queue: [setTimeout 2]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 2]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout 2
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish setTimeout 3
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------
----------------------Loop 1 - Close phase ----------------------

----------------------Loop 2 - Start ----------------------

// setTimeout 3 finished

STATUS:
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - Timer phase ----------------------

// Output: setTimeout 3
// Output: Promise 2 - resolve message

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
begins
Promise 2 - start
forLoop
setTimeout 1
Promise 1
setTimeout 2
Promise 2
setTimeout 3
Promise 2 - resolve message
*/
