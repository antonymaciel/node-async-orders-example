const fs = require("fs");

setTimeout(() => console.log("setTimeout"), 0);
fs.readFile(__dirname + '/template.js', () => console.log("readFile"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------

// Timer setTimeouts starts
// I/O readFile starts
// Output: forLoop
// Timer setTimeout and I/O readFile finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [] // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1  - I/O phase: pending ----------------------
----------------------Loop 1  - I/O phase: poll ----------------------

// Poll I/O readFile and enqueue it

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile] 
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
setTimeout
readFile
*/