// CODE
for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity with the timers


/*
----------------------Loop 1 - Start ----------------------

// [Timer] finished
// [I/O Task] finished
// [Inmmediate] finished
// [Close] finished
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish [timer name]
- I/O queue: [] // Pending to finish [i/o name]
- Check Immediate queue: [] // Pending to finsih [inmmediate name]
- Close queue: [] // Pending to finish [close event name]

----------------------Loop 1 - Timer phase: start ----------------------

// Output: 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish [timer name]
- I/O queue: [] // Pending to finish [i/o name]
- Check Immediate queue: [] // Pending to finsih [inmmediate name]
- Close queue: [] // Pending to finish [close event name]

----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------
----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------
----------------------Loop 1 - Close phase ----------------------

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
*/
