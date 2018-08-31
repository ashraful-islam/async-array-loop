const iterate = require('./iterate');

/**
 * Map operation for array
 * @param {array} to iterate over
 * @param {function} to perform map operation
 * @param {function} callback to indicate loop completion
 */
function arrMap(arr, func, cb) {
  const result = [];
  return iterate(
    arr,
    func,
    cb,
    (value) => {
      if (value) {
        result.push(value);
      }
    },
    () => result
  );
}

module.exports = arrMap;
