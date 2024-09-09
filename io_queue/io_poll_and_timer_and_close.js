const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("readFile");
});

process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));
setTimeout(() => console.log("setTimeout"), 0);
const readableStream = fs.createReadStream(__filename);
readableStream.on("close", () => {
  console.log("readableStream");
});
readableStream.close();

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------
// microstasks enqueued
// Event readableStream closed
// Output: forLoop
// Timer setTimeout and I/O readFile finished 


STATUS: 
- Microtask nextTick queue: [nextTick]
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: [readableStream]

----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise]
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: [readableStream]



----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: [readableStream]

----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: [readableStream]

----------------------Loop 1 - I/O phase: pending ----------------------
----------------------Loop 1 - I/O phase: poll ----------------------

// Poll I/O readFile and enqueue it

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile]
- Check Immediate queue: []
- Close queue: [readableStream]

// There are callbacks in other queues, continues to next phase

----------------------Loop 1 - Check Immediate phase ----------------------
----------------------Loop 1 - Close phase ----------------------

// Output: readableStream

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile]
- Check Immediate queue: []
- Close queue: []


----------------------Loop 2 - Start ----------------------
----------------------Loop 2 - Timer phase ----------------------
----------------------Loop 2 - I/O phase: pending ----------------------

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
readableStream
readFile
*/
