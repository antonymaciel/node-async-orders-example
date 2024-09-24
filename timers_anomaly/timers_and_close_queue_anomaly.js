const fs = require("fs");

setTimeout(() => console.log("setTimeout"), 0);
const readableStream = fs.createReadStream(__filename);
readableStream.close();

readableStream.on("close", () => {
  console.log("readableStream");
});
// to avoid ambiguity with the timers add javascript execution so the event loop is started when the timers are finished 
// e.g for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} }  (Alternative 1 will be executed in this case)


// ALTERNATIVE 1: 

/*
----------------------Loop 1 - Start ----------------------

// Timer setTimeout finished
// Event readableStream closed

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: []
- Close queue: [readableStream]

----------------------Loop 1 - Timer phase ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: [readableStream]

----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------
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


// Output summary of Alternative 1
/*
setTimeout
readableStream
*/



// ALTERNATIVE 2: 

/*
----------------------Loop 1 - Start ----------------------

// Event readableStream closed

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish Timer setTimeout
- I/O queue: [] 
- Check Immediate queue: []
- Close queue: [readableStream]

----------------------Loop 1 - Timer phase ----------------------
----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------
----------------------Loop 1 - Close phase ----------------------

// Output: readableStream

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish Timer setTimeout
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

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
readableStream
setTimeout
*/

