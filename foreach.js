const iterate = require('./iterate');

/**
 * An array foreach operation
 * @param {array} to iterate over
 * @param {function} to receive each element
 * @param {function} callback called when iteration completes
 */
function arrForeach(arr, func, cb) {
  return iterate(arr, func, cb);
}

module.exports = arrForeach;
