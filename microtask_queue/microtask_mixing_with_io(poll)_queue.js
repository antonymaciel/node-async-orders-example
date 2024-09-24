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

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------
// Output: forLoop
// I/O readFile1 and readFile2 finished 


STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [] // Pending to poll I/O readFile 1 and readFile 2
- Check Immediate queue: []
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
- Check Immediate queue: []
- Close queue: []

// No callbacks in other queues, execute readFile 1 enqueued task

// Output: readFile 1
// microtasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 1]
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: [readFile 2]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase: poll / Microtasks: Next ticks ----------------------

// Output: nextTick 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: [readFile 2]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase: poll / Microtasks: Others ----------------------

// Output: Promise 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile 2]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase: poll - resumme ----------------------

// No callbacks in other queues, execute readFile 2 enqueued task

// Output: readFile 2
// microtasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 2]
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase: poll / Microtasks: Next ticks ----------------------

// Output: nextTick 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase: poll / Microtasks: Others ----------------------

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
readFile 1
nextTick 1
Promise 1
readFile 2
nextTick 2
Promise 2
*/
