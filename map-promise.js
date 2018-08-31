const iterate = require('./iterate-promise');

/**
 * Map operation for array
 * @param {array} to iterated over
 * @param {function} map operation function
 * @returns {promise}
 */
function arrMap(arr, func) {
  const result = [];
  return iterate(
    arr,
    func,
    (value) => {
      if (value) {
        result.push(value);
      }
    },
    () => result
  );
}

module.exports = arrMap;
