const  async1 =  async (param) => { 
  let promise = () => new Promise((resolve, reject) => {
    console.log('promise start');
    setTimeout(() => {
      console.log('setTimeout')
      resolve("done! " + param);
    }, 2000)
  });
  const response = await promise();
  console.log('promise response = ', response);

  return response;
}

const  async2 = async () => {
  console.log('async2 start');
  const response = await async1('great!');
  console.log('async1 response = ', response);
  console.log("async2");
}

async2();

for (let i = 0; i <= 1000000000; i++) { if (i === 1000000000) {console.log('forLoop');} } // to avoid ambiguity


/*
----------------------Loop 1 - Start ----------------------

// async2 function starts executing like an usual function (similar to promise constructor)
// Output: async2 start
// async1 function starts executing like an usual function (similar to promise constructor)
// Promise constructor is executed and the promise is created
// Output: promise start
// setTimeout starts counting
// Output: forLoop
// Timer setTimeout finished

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [] // Pending to resolve promise, async1 and async2
- Timers queue: [setTimeout]
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase: start ----------------------

// Output: setTimeout
// async1 reaches the await which will put things into the microtasks queue (like promise.then)
// miscrotask enqueued: async1

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [async1] // Pending to resolve async2
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: promise response = done! great!
// async2 reaches the await which will put things into the microtasks queue (like promise.then)
// miscrotask enqueued: async2

STATUS: 
- Microtask nextTick queue: []
- Microtask Others queue: [async2]
- Timers queue: []
- I/O queue: []
- Check Immediate queue: []
- Close queue: []

----------------------Loop 1 - Timer phase / Microtasks: Others ----------------------

// Output: async1 response = done! great!
// Output: async2

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
async2 start
promise start
forLoop
setTimeout
promise response = done! great!
async1 response = done! great!
async2
*/
