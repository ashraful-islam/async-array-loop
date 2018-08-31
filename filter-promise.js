const iterate = require('./iterate-promise');

/**
 * Array filter to remove any falsy values from array
 * @param {array} to be operated on
 * @param {function} handle the operations, receiveds current element, index, main array and next callback
 * @param {function} callback function, called when operations are completed
 */
function arrFilter(arr, func) {
  const result = [];
  return iterate(
    arr,
    func,
    (value, item) => {
      if (value) {
        result.push(item);
      }
    },
    () => result
  );
}

module.exports = arrFilter;
