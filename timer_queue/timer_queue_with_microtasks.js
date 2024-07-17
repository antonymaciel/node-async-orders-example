setTimeout(() => console.log("setTimeout 1"), 0);
setTimeout(() => console.log("setTimeout 2"), 0);
setTimeout(() => console.log("setTimeout 3"), 0);

process.nextTick(() => console.log("nextTick 1"));
process.nextTick(() => {
  console.log("nextTick 2");
  process.nextTick(() =>
    console.log("nextTick inside nextTick 2")
  );
});
process.nextTick(() => console.log("nextTick 3"));

Promise.resolve().then(() => console.log("Promise 1"));
Promise.resolve().then(() => {
  console.log("Promise 2");
  process.nextTick(() =>
    console.log("nextTick inside Promise 2")
  );
});
Promise.resolve().then(() => console.log("Promise 3"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity with the timers


/*
----------------------Loop 1 - Start ----------------------

// setTimeouts starts counting
// microstasks enqueued
// setTimeout 1 finished
// setTimeout 2 finished
// setTimeout 3 finished

STATUS: 
- Microtask nextTick queue: [nextTick 1, nextTick 2, nextTick 3]
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick 1

STATUS: 
- Microtask nextTick queue: [nextTick 2, nextTick 3]
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: nextTick 2
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 3, nextTick inside nextTick 2]
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: nextTick 3

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: nextTick inside nextTick 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: Promise 2
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick inside Promise 2]
- Microtask Others queue: [Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: Promise 3

STATUS: 
- Microtask nextTick queue: [nextTick inside Promise 2]
- Microtask Others queue: []
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick inside Promise 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: setTimeout 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: setTimeout 3

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
nextTick 1
nextTick 2
nextTick 3
nextTick inside nextTick 2
Promise 1
Promise 2
Promise 3
nextTick inside Promise 2
setTimeout 1
setTimeout 2
setTimeout 3
*/
