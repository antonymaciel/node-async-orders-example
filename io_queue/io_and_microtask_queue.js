const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("readFile");
});

process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------

// I/O readFile starts
// microstasks enqueued
// Output: forLoop
// I/O readFile finished

STATUS: 
- Microtask nextTick queue: [nextTick]
- Microtask Others queue: [Promise]
- Timers queue: [] 
- I/O queue: [readFile]


----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise]
- Timers queue: [] 
- I/O queue: [readFile]

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] 
- I/O queue: []

----------------------Loop 1 - I/O phase ----------------------

// Output: readFile

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] 
- I/O queue: []

---------------------- The End ----------------------
*/




// Output summary
/*
forLoop
nextTick
Promise
readFile
*/
