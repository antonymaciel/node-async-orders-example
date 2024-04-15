const fs = require("fs");

fs.readFile(__dirname + '/template.js', () => {
  console.log("readFile");
});
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));
setTimeout(() => console.log("setTimeout"), 5000); // enough time to avoid ambiguity between read file and timer
setImmediate(() => console.log("setImmediate"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} }  // to avoid ambiguity with the timers


/*
----------------------Loop 1 - Start ----------------------
// microstasks enqueued
// setImmediate enqueued
// Output: forLoop

STATUS: 
- Microtask nextTick queue: [nextTick]
- Microtask Others queue: [Promise]
- Timers queue: [] // Pending to finish setTimeout
- I/O queue: [] // Pending to finish readFile
- Check Immediate queue: [setImmediate]
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise]
- Timers queue: [] // Pending to finish setTimeout
- I/O queue: [] // Pending to finish readFile
- Check Immediate queue: [setImmediate]
- Close queue: []



----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish setTimeout
- I/O queue: [] // Pending to finish readFile
- Check Immediate queue: [setImmediate]
- Close queue: []

----------------------Loop 1 - Timer phase: resume ----------------------
----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------

// Output: setImmediate

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish setTimeout
- I/O queue: [] // Pending to finish readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Close phase ----------------------

----------------------Loop 2 - Start ----------------------
// readFile finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish setTimeout
- I/O queue: [readFile]
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - Timer phase ----------------------
----------------------Loop 2 - I/O phase ----------------------

// Output: readFile

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish setTimeout
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 3 - Start ----------------------
// setTimeout finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 3 - Timer phase ----------------------

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
forLoop
nextTick
Promise
setImmediate
readFile
setTimeout
*/
