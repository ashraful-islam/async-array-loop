'use strict';

const arrMap = require('./../map');
const { expect } = require('chai');

const sampleArr = [1,2,3,4];
const sampleArrCopy = [1,2,3,4];

describe('map', function() {

  it('should map new values correctly', function(done) {
    const expected_result = [2,4,6,8];

    arrMap(
      sampleArr,
      function (el, idx, arr, next) {

        // check if even number
        next(null, el * 2);

      },
      function (err, filtered_arr) {
        expect(filtered_arr).to.deep.equal(expected_result);
        done(err);
      }
    );


  });

  it('should complete with error', function(done) {

    arrMap(
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
    arrMap([],null,function (err, result) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should complete with error for invalid array input', function(done) {
    arrMap({}, function () { }, function (err, result) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should keep the original array intact', function() {
    expect(sampleArr).to.deep.equal(sampleArrCopy);
  });
});