/**
 * Array filter to remove any falsy values from array
 * @param {array} to be operated on
 * @param {function} handle the operations, receiveds current element, index, main array and next callback
 * @param {function} callback function, called when operations are completed
 */
function arrFilter(arr, func) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      return reject(new Error('First argument must be a valid array.'));
    }

    if (typeof func !== 'function') {
      return reject(new Error('Second argument must be a valid function.'));
    }

    // Initialize
    const len = arr.length;
    let i = 0;
    let _arr = [];

    if (len > 0) {
      func(arr[i], i, arr, next);
    } else {
      return resolve(_arr);
    }

    function next(err, isTrue) {
      setImmediate(() => {
        if (err) {
          return reject(err);
        }

        if (isTrue) {
          _arr = _arr.concat([arr[i]]);
        }

        if (++i < len) {
          func(arr[i], i, arr, next);
          return;
        }

        resolve(_arr);
      });
    }
  });
}

module.exports = arrFilter;
