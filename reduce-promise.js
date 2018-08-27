const arrReduce = require('./reduce');

/**
 * Reduce method for array
 * @param {array} to iterate over
 * @param {function} to perform reduce
 * @param {any} initial value (optional)
 * @returns {promise}
 */
function arrReducePromise(arr, func, accumulator) {
  return new Promise((resolve, reject) => {
    const args = [arr, func, (err, data) => err ? reject(err) : resolve(data)];
    if (arguments.length >= 3) {
      args.push(accumulator);
    }
    arrReduce(...args);
  });
}

module.exports = arrReducePromise;
