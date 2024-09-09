setTimeout(() => {
  console.log("setTimeout 1");
  process.nextTick(() => console.log("nextTick 1"));
  Promise.resolve().then(() => console.log("Promise 1"));
}, 0);

setTimeout(() => {
  console.log("setTimeout 2");
  process.nextTick(() => console.log("nextTick 2"));
  Promise.resolve().then(() => console.log("Promise 2"));
}, 0);

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity

/*
----------------------Loop 1 - Start ----------------------


// Timer setTimeout 1 enqueued
// Timer setTimeout 2 enqueued

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 1, setTimeout 2]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase  ----------------------
// Output: setTimeout 1
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 1]
- Microtask Others queue: [Promise 1]
- Timers queue: [setTimeout 2]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1]
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
- Microtask nextTick queue: [nextTick 2]
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick 2

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
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

---------------------- The End ----------------------
*/

// Output summary
/*
forLoop
setTimeout 1
nextTick 1
Promise 1
setTimeout 2
nextTick 2
Promise 2
*/