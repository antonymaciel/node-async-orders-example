// CODE
for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------

// Timer [Timer] starts
// I/O [I/O Task] starts
// Immmediate [Inmmediate] enqueued
// Evnet [Close] starts
// Output: forLoop
// Timer[Timer] finished
// I/O [I/O Task] finished
// Event [Close] finished
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish Timer [timer name]
- I/O queue: [] // Pending to finish or poll I/O [i/o name]
- Check Immediate queue: []
- Close queue: [] // Pending to close Event [close event name]

----------------------Loop 1 - Timer phase: start ----------------------

// Output: 

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [] // Pending to finish Timer [timer name]
- I/O queue: [] // Pending to finish or poll I/O [i/o name]
- Check Immediate queue: []
- Close queue: [] // Pending to close Event [close event name]

----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------
----------------------Loop 1 - I/O phase: pending ----------------------
----------------------Loop 1 - I/O phase: pending / Microtasks: Next ticks ----------------------
----------------------Loop 1 - I/O phase: pending / Microtasks: Others ----------------------
----------------------Loop 1 - I/O phase: pending / Microtasks: Next ticks ----------------------

----------------------Loop 1  - I/O phase: poll ----------------------

// Poll I/O [i/o name] and enqueue it
// No callbacks in other queues, execute I/O enqueued tasks

----------------------Loop 1 - I/O phase: poll / Microtasks: Next ticks ----------------------
----------------------Loop 1 - I/O phase: poll / Microtasks: Others ----------------------
----------------------Loop 1 - I/O phase: poll / Microtasks: Next ticks ----------------------

// There are callbacks in other queues, continues to next phase

----------------------Loop 1 - Check Immediate phase / Microtasks: Next ticks ----------------------
----------------------Loop 1 - Check Immediate phase / Microtasks: Others ----------------------
----------------------Loop 1 - Check Immediate phase / Microtasks: Next ticks ----------------------

----------------------Loop 1 - Close phase / Microtasks: Next ticks ----------------------
----------------------Loop 1 - Close phase / Microtasks: Others ----------------------
----------------------Loop 1 - Close phase / Microtasks: Next ticks ----------------------

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
*/
