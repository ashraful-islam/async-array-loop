Async-Array-Loop
=========

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Build Status](https://travis-ci.org/ashraful-islam/async-array-loop.svg?branch=master)](https://travis-ci.org/ashraful-islam/async-array-loop)

A small library with non-blocking array methods(map, reduce, filter, foreach)

## Installation

  `npm install async-array-loop`

## Usage

To use one of the methods, simply import it. Each method has a separate version that uses promise instead of callback.

To use the method with promise, import the module name with suffix `Promise`, for example,
`const { filterPromise } = require('async-array-loop')`

Following you can see some examples on the usage of each method

### Filter

```js
const { filter } = require('async-array-loop');

const someNums = [1,2,3,4];

filter(
  someNums,
  // the processing function
  (current, index, array, next) => {

    let isGreaterThanTwo = current > 2;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, isGreaterThanTwo);
  },
  // called when complete
  (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(result); // => [3,4]
  }
);

```

### Filter(with promise)

```js
const { filterPromise } = require('async-array-loop');

const someNums = [1,2,3,4];

filterPromise(
  someNums,
  // the processing function
  (current, index, array, next) => {

    let isGreaterThanTwo = current > 2;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, isGreaterThanTwo);
  }
).then((result) => {
  console.log(result); // => [3,4]
}).catch((error) => {
  if (error) {
    console.log(error);
  }
});
```

### Foreach

```js
const { foreach } = require('async-array-loop');

const someNums = [1,2,3,4];

foreach(
  someNums,
  // the processing function
  (current, index, array, next) => {

    // observe the values at index
    console.log(`value is ${current} at index ${index}`);

    // call next once done,
    // foreach only takes single argument,
    // if an error is passed, loop will halt and return the error in callback
    next(null);
  },
  // callback when complete
  (error) => {

    // if an error occured or passed via the 'next' callback,
    // it'll be available here
    if (error) {
      console.log(error);
      return;
    }

    console.log('done');
  }
);

```

### Foreach(with promise)

```js
const { foreachPromise } = require('async-array-loop');

const someNums = [1,2,3,4];

foreachPromise(
  someNums,
  // the processing function
  (current, index, array, next) => {

    // observe the values at index
    console.log(`value is ${current} at index ${index}`);

    // call next once done,
    // foreach only takes an argument,
    // if error is passed, the loop will halt immediately
    next(null);
  }
).then(() => {
  // foreach does not return any value on completion
  console.log('done');
}).catch((error) => {
  if (error) {
    console.log(error);
  }
});
```
### Reduce

```js
const { reduce } = require('async-array-loop');

const someNums = [1,2,3,4];

reduce(
  someNums,
  // the processing function
  (prevValue, nextValue, next) => {

    let sum = prevValue + nextValue;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, sum);
  },
  // called when complete
  (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(result); // => 10
  }
);

// it is also possible to pass an initial value
let initialValue = 50;

reduce(
  someNums,
  // the processing function
  (prevValue, nextValue, next) => {

    let sum = prevValue + nextValue;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, sum);
  },
  // called when complete
  (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(result); // => 60
  },
  initialValue
);

```

### Reduce(with promise)

```js
const { reducePromise } = require('async-array-loop');

const someNums = [1,2,3,4];

reducePromise(
  someNums,
  // the processing function
  (prevValue, nextValue, next) => {
    // double each number
    let sum = prevValue + nextValue;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, sum);
  }
).then((result) => {
  console.log(result); // => 10
}).catch((error) => {
  if (error) {
    console.log(error);
  }
});

// it is also possible to pass an initial value
let initialValue = 20;

reducePromise(
  someNums,
  // the processing function
  (prevValue, nextValue, next) => {
    // double each number
    let sum = prevValue + nextValue;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, sum);
  },
  initialValue // we pass an initial value
).then((result) => {
  console.log(result); // => 30
}).catch((error) => {
  if (error) {
    console.log(error);
  }
});

```


### Map

```js
const { map } = require('async-array-loop');

const someNums = [1,2,3,4];

map(
  someNums,
  // the processing function
  (current, index, array, next) => {

    let doubleOfCurrent = current * 2;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, doubleOfCurrent);
  },
  // called when complete
  (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(result); // => [2,4,6,8]
  }
);

```

### Map(with promise)

```js
const { mapPromise } = require('async-array-loop');

const someNums = [1,2,3,4];

mapPromise(
  someNums,
  // the processing function
  (current, index, array, next) => {
    // double each number
    let doubleOfCurrent = current * 2;

    // call next once done,
    // first argument is error,
    // second argument is the value to return
    next(null, doubleOfCurrent);
  }
).then((result) => {
  console.log(result); // => [2,4,6,8]
}).catch((error) => {
  if (error) {
    console.log(error);
  }
});
```

## Tests

To test first run `npm install` and finally `npm run test`

## Contributing

This library(excluding tests) is written following the [XO](https://github.com/sindresorhus/xo) coding style.
All kinds of improvements/suggestions/PRs are welcomed.
Please write tests for any changes you want to make and submit a PR. :)

## License

This library is released under the **MIT** license.