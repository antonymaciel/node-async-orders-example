const fs = require("fs");

const readableStream = fs.createReadStream(__filename);
readableStream.on("close", () => {
  console.log("readableStream");
});
readableStream.close();

setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("setTimeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("nextTick"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity

/*
----------------------Loop 1 - Start ----------------------

// setImmediate enqueued
// microstasks enqueued
// Output: forLoop
// Timer setTimeout finished
// Event readableStream closed

STATUS: 
- Microtask nextTick queue: [nextTick]
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: [setImmediate]
- Close queue: [readableStream]

----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: [setImmediate]
- Close queue: [readableStream]

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate]
- Close queue: [readableStream]

----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate]
- Close queue: [readableStream]

----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------

// Output: setImmediate

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: [readableStream]

----------------------Loop 1 - Close phase ----------------------


// Output: readableStream

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
setImmediate
readableStream
*/
