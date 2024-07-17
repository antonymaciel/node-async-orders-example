const fs = require("fs");

setTimeout(() => console.log("setTimeout"), 0);
fs.readFile(__dirname + '/template.js', () => console.log("readFile"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity with the timers


/*
----------------------Loop 1 - Start ----------------------
// Output: forLoop
// setTimeout finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout]
- I/O queue: [] // Pending to finish readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase ----------------------

// Output: setTimeout

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [] // Pending to finish readFile
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1  - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------
----------------------Loop 1 - Close phase ----------------------

----------------------Loop 2 - Start ----------------------
// readFile I/O finished

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: [readFile] 
- Check Immediate queue: []
- Close queue: []

----------------------Loop 2 - Timer phase ----------------------
----------------------Loop 2 - I/O phase ----------------------

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