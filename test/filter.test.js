'use strict';

const arrFilter = require('./../filter');
const { expect } = require('chai');

const sampleArr = [2,3,4,5,6,7,8,9,10,11,12];
const sampleArrCopy = [2,3,4,5,6,7,8,9,10,11,12];

describe('filter', function() {

  it('should remove falsy test cases', function(done) {
    const expected_result = [2,4,6,8,10,12];

    arrFilter(
      sampleArr,
      function (el, idx, arr, next) {

        // check if even number
        next(null, el % 2 === 0);

      },
      function (err, filtered_arr) {
        expect(filtered_arr).to.deep.equal(expected_result);
        done(err);
      }
    );


  });

  it('should complete with error', function(done) {

    arrFilter(
      sampleArr,
      function (el, idx, arr, next) {

        // check if even number
        next(new Error('test error'));

      },
      function (err, filtered_arr) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );

  });

  it('should complete with error for invalid map function',function(done) {
    arrFilter(
      [],
      null,
      function (err, result) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );
  });

  it('should complete with error for invalid array input', function(done) {
    arrFilter(
      {},
      function (el, idx, arr, next) {

        // check if even number
        next(null, el * 2);

      },
      function (err, result) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );
  });

  it('should keep the original array intact', function() {
    expect(sampleArr).to.deep.equal(sampleArrCopy);
  })
});