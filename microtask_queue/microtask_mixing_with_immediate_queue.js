setImmediate(() => {
  console.log("setImmediate 1");
  process.nextTick(() => console.log("nextTick 1"));
  Promise.resolve().then(() => console.log("Promise 1"));
});

setImmediate(() => {
  console.log("setImmediate 2");
  process.nextTick(() => console.log("nextTick 2"));
  Promise.resolve().then(() => console.log("Promise 2"));
});

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity

/*
----------------------Loop 1 - Start ----------------------


// Immmediate setImmediate 1 enqueued
// Immmediate setImmediate 2 enqueued

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate 1, setImmediate 2]
- Close queue: []

----------------------Loop 1 - Timer phase  ----------------------
----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------

// Output: setImmediate 1
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 1]
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate 2]
- Close queue: []

----------------------Loop 1 - Check Immediate / Microtasks: Next ticks ----------------------

// Output: nextTick 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate 2]
- Close queue: []

----------------------Loop 1 - Check Immediate / Microtasks: Others ----------------------

// Output: Promise 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: [setImmediate 2]
- Close queue: []

----------------------Loop 1 - Check Immediate: resume ----------------------

// Output: setImmediate 2
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 2]
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Check Immediate / Microtasks: Next ticks ----------------------

// Output: nextTick 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Check Immediate / Microtasks: Others ----------------------

// Output: Promise 2

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
setImmediate 1
nextTick 1
Promise 1
setImmediate 2
nextTick 2
Promise 2
*/