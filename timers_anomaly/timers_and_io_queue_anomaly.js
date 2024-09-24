const fs = require("fs");

setTimeout(() => console.log("setTimeout"), 0);

fs.readFile(__filename, () => {
  console.log("readFile");
});
// to avoid ambiguity with the timers add javascript execution so the event loop is started when the timers are finished 
// e.g for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} }  (Alternative 1 will be executed in this case)


// ALTERNATIVE 1: 

/*
----------------------Loop 1 - Start ----------------------

// Timer setTimeout finished
// I/O readFile finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: []  // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []  // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - I/O phase:pending ----------------------
----------------------Loop 1 - I/O phase:poll ----------------------

// Poll I/O readFile and enqueue it

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile]
- Check Immediate queue: []
- Close queue: []

// No callbacks in other queues, execute readFile enqueued task

Output: readFile

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

---------------------- The End ----------------------
*/


// Output summary of Alternative 1
/*
setTimeout
readFile
*/



// ALTERNATIVE 2: 

/*
----------------------Loop 1 - Start ----------------------

// I/O readFile finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []  // Pending to finish Timer setTimeout
- I/O queue: []  // Pending to poll I/O readFile
- Check Immediate queue: []
- Close queue: []
----------------------Loop 1 - Timer phase ----------------------
----------------------Loop 1 - I/O phase:pending ----------------------
----------------------Loop 1 - I/O phase:poll ----------------------

// Poll I/O readFile and enqueue it

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish Timer setTimeout
- I/O queue: [readFile]
- Check Immediate queue: []
- Close queue: []

// No callbacks in other queues, execute readFile enqueued task

Output: readFile

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish Timer setTimeout
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Check Immediate phase ----------------------
----------------------Loop 1 - Close phase ----------------------

----------------------Loop 2 - Start ----------------------
// Timer setTimeout finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - Timer phase ----------------------

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




// Output summary of Alternative 2
/*
readFile
setTimeout
*/

