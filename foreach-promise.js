/**
 * An array foreach operation
 * @param {array} to iterate over
 * @param {function} to receive each element
 * @returns {promise}
 */
module.exports = function (arr, func) {
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

    if (len > 0) {
      func(arr[i], i, arr, next);
    } else {
      resolve();
    }

    function next(err) {
      setImmediate(() => {
        if (err) {
          return reject(err);
        }

        if (++i < len) {
          return func(arr[i], i, arr, next);
        }

        return resolve();
      });
    }
  });
};
