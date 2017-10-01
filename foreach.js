/**
 * An array foreach operation
 * @param {array} to iterate over
 * @param {function} to receive each element
 * @param {function} callback called when iteration completes
 */
function arrForeach(arr, func, cb) {
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
  const _arr = arr.slice();

  if (len > 0) {
    func(_arr[i], i, _arr, next);
  } else {
    return onComplete();
  }

  function next(err) {
    setImmediate(() => {
      if (err) {
        return onComplete(err);
      }

      if (++i < len) {
        func(_arr[i], i, _arr, next);
        return;
      }

      return onComplete();
    });
  }
}

module.exports = arrForeach;
