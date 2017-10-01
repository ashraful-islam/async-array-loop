/**
 * Map operation for array
 * @param {array} to iterate over
 * @param {function} to perform map operation
 * @param {function} callback to indicate loop completion
 */
function arrMap(arr, func, cb) {
  const onComplete = (typeof cb === 'function') ? cb : function () { };

  if (!Array.isArray(arr)) {
    return onComplete(new Error('First argument must be a valid array.'));
  }

  if (typeof func !== 'function') {
    return onComplete(new Error('Second argument must be a valid function.'));
  }

  // Initialize
  let i = 0;
  const len = arr.length;
  const _arr = new Array(len);

  if (len > 0) {
    func(arr[i], i, arr, next);
  } else {
    onComplete(null, _arr);
  }

  function next(err, newValue) {
    setImmediate(() => {
      if (err) {
        return onComplete(err);
      }

      if (i < len) {
        _arr[i++] = newValue;
        func(arr[i], i, arr, next);
        return;
      }

      onComplete(null, _arr);
    });
  }
}

module.exports = arrMap;
