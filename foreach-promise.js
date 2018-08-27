const iterate = require('./iterate-promise');

/**
 * An array foreach operation
 * @param {array} to iterate over
 * @param {function} to receive each element
 * @returns {promise}
 */
function arrForeach(arr, func) {
  return iterate(arr, func);
}

module.exports = arrForeach;
