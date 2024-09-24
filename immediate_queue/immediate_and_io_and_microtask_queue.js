// CODE
const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("readFile");
  setImmediate(() => console.log("setImmediate1"));
  process.nextTick(() =>
	  console.log("innerNextTick")
	);
	Promise.resolve().then(() =>
	  console.log("innerPromise")
	);
});
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));
setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate2"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------
// microstasks enqueued
// Immmediate setImmediate2 enqueued
// Output: forLoop
// Timer setTimeout and I/O readFile finished 


STATUS: 
- Microtask nextTick queue: [nextTick]
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: [setImmediate2]
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: [setImmediate2]
- Close queue: []



----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: [setImmediate2]
- Close queue: []

----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: [setImmediate2]
- Close queue: []

----------------------Loop 1 - I/O phase: pending ----------------------
----------------------Loop 1 - I/O phase: poll ----------------------

// Poll I/O readFile and enqueue it

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile]
- Check Immediate queue: [setImmediate2]
- Close queue: []

// There are callbacks in other queues, continues to next phase

----------------------Loop 1 - Check Immediate phase ----------------------

// Output: setImmediate2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Close phase ----------------------

----------------------Loop 2 - Start ----------------------
----------------------Loop 2 - Timer phase ----------------------
----------------------Loop 2 - I/O phase: pending ----------------------

// Output: readFile
// Immmediate setImmediate1 enqueued
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [innerNextTick]
- Microtask Others queue: [innerPromise]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate1]
- Close queue: []

----------------------Loop 2 - I/O phase: pending / Microtasks: Next ticks ----------------------

Output: innerNextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [innerPromise]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate1]
- Close queue: []

----------------------Loop 2 - I/O phase: pending / Microtasks: Others ----------------------

Output: innerPromise

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate1]
- Close queue: []

----------------------Loop 2 - I/O phase: poll ----------------------
----------------------Loop 2 - Check Immediate phase ----------------------

// Output: setImmediate1

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
setImmediate2
readFile
innerNextTick
innerPromise
setImmediate1
*/
