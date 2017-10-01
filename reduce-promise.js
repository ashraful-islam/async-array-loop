/**
 * Reduce method for array
 * @param {array} to iterate over
 * @param {function} to perform reduce
 * @param {any} initial value (optional)
 * @returns {promise}
 */
function arrReduce(arr, func, accumulator) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      return reject(new Error('A valid array is required'));
    }

    if (typeof func !== 'function') {
      return reject(new Error('A valid iteration function is required'));
    }

    // Initialize
    const len = arr.length;
    let i = 0;

    // Handle missing accumulator
    const _accum = (arguments.length < 3) ? arr[i++] : accumulator;

    if (len > 0) {
      func(_accum, arr[i], next);
    } else {
      resolve();
    }

    function next(err, prevValue) {
      setImmediate(() => {
        if (err) {
          return reject(err);
        }

        if (++i < len) {
          return func(prevValue, arr[i], next);
        }

        return resolve(prevValue);
      });
    }
  });
}

module.exports = arrReduce;
