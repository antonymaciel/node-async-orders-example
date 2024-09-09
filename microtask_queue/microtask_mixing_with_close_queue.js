const readableStream = fs.createReadStream(__filename);
readableStream.on("close", () => {
  console.log("readableStream 1");
  process.nextTick(() => console.log("nextTick 1"));
  Promise.resolve().then(() => console.log("Promise 1"));
});
readableStream.close();

const readableStream2 = fs.createReadStream(__filename);
readableStream2.on("close", () => {
  console.log("readableStream 2");
  process.nextTick(() => console.log("nextTick 2"));
  Promise.resolve().then(() => console.log("Promise 2"));
});
readableStream2.close();

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity

/*
----------------------Loop 1 - Start ----------------------


// Event readableStream 1 closed
// Event readableStream 2 closed

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: [readableStream 1, readableStream 2]

----------------------Loop 1 - Timer phase  ----------------------
----------------------Loop 1 - I/O phase ----------------------
----------------------Loop 1 - Check Immediate phase ----------------------
----------------------Loop 1 - Close phase: start ----------------------


// Output: readableStream 1
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 1]
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: [readableStream 2]

----------------------Loop 1 - Close phase / Microtasks: Next ticks ----------------------

// Output: nextTick 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 1]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: [readableStream 2]

----------------------Loop 1 - Close phase / Microtasks: Others ----------------------

// Output: Promise 1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: [readableStream 2]

----------------------Loop 1 - Close phase: resume ----------------------

// Output: readableStream 2
// microstasks enqueued

STATUS: 
- Microtask nextTick queue: [nextTick 2]
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Close phase / Microtasks: Next ticks ----------------------

// Output: nextTick 2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [Promise 2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Close phase / Microtasks: Others ----------------------

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
readableStream 1
nextTick 1
Promise 1
readableStream 2
nextTick 2
Promise 2
*/
