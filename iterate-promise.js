const iterate = require('./iterate');

function iteratePromise(arr, func, valueFn, resultFn) {
  return new Promise((resolve, reject) => {
    iterate(arr, func, (err, data) => err ? reject(err) : resolve(data), valueFn, resultFn);
  });
}

module.exports = iteratePromise;
