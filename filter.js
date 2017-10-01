/**
 * Array filter to remove any falsy values from array
 * @param {array} to be operated on
 * @param {function} handle the operations, receiveds current element, index, main array and next callback
 * @param {function} callback function, called when operations are completed
 */
function arrFilter(arr, func, cb) {
  const onComplete = (typeof cb === 'function') ? cb : function () { };

  if (!Array.isArray(arr)) {
    return onComplete(new Error('First argument must be a valid array.'));
  }

  if (typeof func !== 'function') {
    return onComplete(new Error('Second argument must be a valid function.'));
  }

  // Initialize
  let i = 0;
  let _arr = [];
  const len = arr.length;

  if (len > 0) {
    func(arr[i], i, arr, next);
  } else {
    return onComplete(null, _arr);
  }

  function next(err, isTrue) {
    setImmediate(() => {
      if (err) {
        return onComplete(err);
      }

      if (isTrue) {
        _arr = _arr.concat([arr[i]]);
      }

      if (++i < len) {
        func(arr[i], i, arr, next);
        return;
      }

      onComplete(null, _arr);
    });
  }
}

module.exports = arrFilter;
