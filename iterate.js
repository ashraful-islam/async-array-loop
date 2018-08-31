function iterate(arr, func, cb, valueFn, resultFn) {
  const onComplete = typeof cb === 'function' ? cb : () => {};

  if (!Array.isArray(arr)) {
    return onComplete(new Error('First argument must be a valid array.'));
  }

  if (typeof func !== 'function') {
    return onComplete(new Error('Second argument must be a valid function.'));
  }

  let i = 0;
  const len = arr.length;
  
  function next() {
    setImmediate(() => {
      if (i >= len) {
        if (resultFn) {
          return onComplete(undefined, resultFn());
        }
        return onComplete();
      }
      func(arr[i], i, arr, (err, data) => {
        if (valueFn) {
          valueFn(data, arr[i], i, arr);
        }
        if (err) {
          return onComplete(err);
        }
        i++;
        return next();
      });
    });
  }
  
  next();
}

module.exports = iterate;
