// index.js
setTimeout(() => console.log("setTimeout 1"), 1000);
setTimeout(() => console.log("setTimeout 2"), 500);
setTimeout(() => console.log("setTimeout 3"), 0);

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity

/*
----------------------Loop 1 - Start ----------------------

// Output: forLoop
// Timers setTimeout 3, setTimeout 2 and setTiemout 1 finished 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 3, setTimeout 2, setTiemout 1]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------

// Output: setTimeout 3

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 2, setTiemout 1]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: setTimeout 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTiemout 1]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: setTimeout 1

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
setTimeout 3
setTimeout 2
setTimeout 1
*/
