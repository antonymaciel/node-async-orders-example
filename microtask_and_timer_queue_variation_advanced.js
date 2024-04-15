async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1");
  return "async1 resolve";
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1().then(function (value) {
  console.log(value);
  console.log("async1.then");
});

new Promise(function (resolve) {
  console.log("promise start");
  resolve();
}).then(function () {
  console.log("promise");
});

console.log("script end");

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity with the timers





/*
----------------------Loop 1 - Start ----------------------

// Output: script start
// setTimeout starts counting
// async1 function starts executing like an usual function (similar to promise constructor)
// Output: async1 start
// async2 function starts executes like an usual function (similar to promise constructor)
// Output: async2
// async1 reaches the await which will put things into the microtasks queue (like promise.then)
// miscrotask enqueued: async1
// Output: promise start
// microtask enqueued: promise1
// Output: script end
// Output: forLoop
// setTimeout finished

STATUS: 
- Microtask nextTick queue: [async1, promise1]
- Microtask Others queue: []
- Timers queue: [setTimoeut]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------
----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: async1
// enqueue microtask: async1.then

STATUS: 
- Microtask nextTick queue: [promise, async1.then]
- Microtask Others queue: []
- Timers queue: [setTimoeut]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: promise

STATUS: 
- Microtask nextTick queue: [async1.then]
- Microtask Others queue: []
- Timers queue: [setTimoeut]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

// Output: async1 resolve
// Output: async1.then

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: []
- Timers queue: [setTimoeut]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: resume ----------------------

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




// Output summary
/*
script start
async1 start
async2
promise start
script end
forLoop
async1
promise
async1 resolve
async1.then
setTimeout
*/
