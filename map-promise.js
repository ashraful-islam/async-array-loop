/**
 * Map operation for array
 * @param {array} to iterated over
 * @param {function} map operation function
 * @returns {promise}
 */
function arrMap(arr, func) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      return reject(new Error('First argument must be a valid array.'));
    }

    if (typeof func !== 'function') {
      return reject(new Error('Second argument must be a valid function.'));
    }

    // Initialize
    let i = 0;
    const len = arr.length;
    const _arr = new Array(len);

    if (len > 0) {
      func(arr[i], i, arr, next);
    } else {
      resolve(_arr);
    }

    function next(err, newValue) {
      setImmediate(() => {
        if (err) {
          return reject(err);
        }

        if (i < len) {
          _arr[i++] = newValue;
          return func(arr[i], i, arr, next);
        }

        return resolve(_arr);
      });
    }
  });
}

module.exports = arrMap;
