const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("readFile 1");
  process.nextTick(() => console.log("nextTick 1"));
  Promise.resolve().then(() => console.log("Promise 1"));
});
fs.readFile(__filename, () => {
  console.log("readFile 2");
  process.nextTick(() => console.log("nextTick 2"));
  Promise.resolve().then(() => console.log("Promise 2"));
});
setImmediate(() => console.log("setImmediate"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------
// Output: forLoop
// I/O readFile1 and readFile2 finished 
// Immmediate setImmediate enqueued


STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [] // Pending to poll I/O readFile 1 and readFile 2
- Check Immediate queue: [setImmediate]
- Close queue: []

----------------------Loop 1 - Timer phase ----------------------

----------------------Loop 1 - I/O phase: pending ----------------------
----------------------Loop 1 - I/O phase: poll ----------------------

// Poll I/O readFile 1 and enqueue it
// Poll I/O readFile 2 and enqueue it

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile 1, readFile 2]
- Check Immediate queue: [setImmediate]
- Close queue: []

// There are callbacks in other queues, continues to next phase

----------------------Loop 1 - Check Immediate phase ----------------------

// Output: setImmediate

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile 1, readFile 2]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Close phase ----------------------

----------------------Loop 2 - Start ----------------------
----------------------Loop 2 - Timer phase ----------------------
----------------------Loop 2 - I/O phase: pending ----------------------

// Output: readFile 1
// microtasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 1]
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: [readFile 2]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - I/O phase: pending / Microtasks: Next ticks ----------------------

// Output: nextTick 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: [readFile 2]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - I/O phase: pending / Microtasks: Others ----------------------

// Output: Promise 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile 2]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase: pending - resumme ----------------------

// Output: readFile 2
// microtasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 2]
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - I/O phase: pending / Microtasks: Next ticks ----------------------

// Output: nextTick 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - I/O phase: pending / Microtasks: Others ----------------------

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
setImmediate
readFile 1
nextTick 1
Promise 1
readFile 2
nextTick 2
Promise 2
*/
