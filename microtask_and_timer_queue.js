setTimeout(() => {
  console.log("setTimeout 1");
  process.nextTick(() => {
    console.log("setTimeout 1 nextTick first");
    process.nextTick(() => {
      console.log("setTimeout 1 nextTick second")
      Promise.resolve().then(() => console.log("setTimeout 1 promise first"));
    });
    Promise.resolve().then(() => console.log("setTimeout 1 promise second"));
    process.nextTick(() => console.log("setTimeout 1 nextTick third"));
  })
}, 0);
setTimeout(() => {
  console.log("setTimeout 2");
  process.nextTick(() => console.log("setTimeout 2 nextTick"))
}, 0);
setTimeout(() => console.log("setTimeout 3"), 0);

process.nextTick(() => console.log("nextTick 1"));
process.nextTick(() => {
  console.log("nextTick 2");
  process.nextTick(() => console.log("nextTick 2 nextTick"));
});
process.nextTick(() => console.log("nextTick 3"));

Promise.resolve().then(() => console.log("Promise 1"));
Promise.resolve().then(() => {
  console.log("Promise 2");
  process.nextTick(() => console.log("Promise 2 nextTick"));
  Promise.resolve().then(() => console.log("Promise 2 promise"));
});
Promise.resolve().then(() => console.log("Promise 3"));

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity with the timers

/*
----------------------Loop 1 - Start ----------------------
// microstasks enqueued
// Output: forLoop
// setTimeout 1, setTimeout 2 and setTiemout 3 finished 

STATUS: 
- Microtask nextTick queue: [nextTick 1, nextTick 2, nextTick 3]
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: nextTick 1

STATUS: 
- Microtask nextTick queue: [nextTick 2, nextTick 3]
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: nextTick 2
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 3, nextTickt 2 nextTick]
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: nextTick 3

STATUS: 
- Microtask nextTick queue: [nextTickt 2 nextTick]
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: nextTickt 2 nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1, Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: Promise 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 2, Promise 3]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: Promise 2
// microstasks enqueued


STATUS: 
- Microtask nextTick queue: [Promise 2 nextTick]
- Microtask Others queue: [Promise 3, Promise 2 promise]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: Promise 3

STATUS: 
- Microtask nextTick queue: [Promise 2 nextTick]
- Microtask Others queue: [Promise 2 promise]
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: Promise 2 promise

STATUS: 
- Microtask nextTick queue: [Promise 2 nextTick]
- Microtask Others queue: []
- Timers queue: [setTimeout 1, setTimeout 2, setTiemout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: Promise 2 nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 1, setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout 1 
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [setTimeout 1 nextTick first]
- Microtask Others queue: []
- Timers queue: [setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: setTimeout 1 nextTick first
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [setTimeout 1 nextTick second, setTimeout 1 nextTick third]
- Microtask Others queue: [setTimeout 1 promise second]
- Timers queue: [setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: setTimeout 1 nextTick second
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [setTimeout 1 nextTick third]
- Microtask Others queue: [setTimeout 1 promise second, setTimeout 1 promise first]
- Timers queue: [setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: setTimeout 1 nextTick third

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [setTimeout 1 promise second, setTimeout 1 promise first]
- Timers queue: [setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: setTimeout 1 promise second

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [setTimeout 1 promise first]
- Timers queue: [setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: setTimeout 1 promise first

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 2, setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: resume ----------------------

// Output: setTimeout 2
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [setTimeout 2 nextTick]
- Microtask Others queue: []
- Timers queue: [setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


----------------------Loop 1 - Timer phase / Microtasks: Next ticks ----------------------

// Output: setTimeout 2 nextTick

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimeout 3]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []


----------------------Loop 1 - Timer phase: resume ----------------------

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
forLoop
nextTick 1
nextTick 2
nextTick 3
nextTick 2 nextTick
Promise 1
Promise 2
Promise 3
Promise 2 promise
Promise 2 nextTick
setTimeout 1
setTimeout 1 nextTick first
setTimeout 1 nextTick second
setTimeout 1 nextTick third
setTimeout 1 promise second
setTimeout 1 promise first
setTimeout 2
setTimeout 2 nextTick
setTimeout 3
*/
