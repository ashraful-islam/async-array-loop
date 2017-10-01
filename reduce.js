/**
 * Reduce method for array
 * @param {array} to iterate over
 * @param {function} to perform reduce
 * @param {function} callback to report completion
 * @param {any} initial value (optional)
 */
function arrReduce(arr, func, cb, accumulator) {
  const onComplete = (typeof cb === 'function') ? cb : function () { };

  if (!Array.isArray(arr)) {
    return onComplete(new Error('A valid array is required'));
  }

  if (!func || typeof func !== 'function') {
    return onComplete(new Error('A valid iteration function is required'));
  }

  // Initialize
  const len = arr.length;
  let i = 0;

  // Handle missing accumulator
  const _accum = (arguments.length < 4) ? arr[i++] : accumulator;

  if (len > 0) {
    func(_accum, arr[i], next);
  } else {
    return onComplete();
  }

  function next(err, prevValue) {
    setImmediate(() => {
      if (err) {
        return onComplete(err);
      }

      if (++i < len) {
        return func(prevValue, arr[i], next);
      }

      return onComplete(null, prevValue);
    });
  }
}

module.exports = arrReduce;
