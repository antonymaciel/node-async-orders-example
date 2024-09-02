const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("readFile");
});

process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));
setTimeout(() => console.log("setTimeout"), 0);

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------

// I/O readFile starts
// Timer setTimeout starts
// microstasks enqueued
// Output: forLoop
// Timer setTimeout and I/O readFile finished

STATUS: 
- Microtask nextTick queue: [nextTick]
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase: pending ----------------------
----------------------Loop 1 - I/O phase: poll ----------------------

// Poll I/O readFile and enqueue it

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


// No callbacks in other queues, execute I/O enqueued tasks

// Output: readFile

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
nextTick
Promise
setTimeout
readFile
*/
