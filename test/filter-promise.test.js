'use strict';

/* global it */

const arrFilter = require('./../filter-promise');
const { expect } = require('chai');

const sampleArr = [2,3,4,5,6,7,8,9,10,11,12];
const sampleArrCopy = [2,3,4,5,6,7,8,9,10,11,12];

describe('filter with promise', function() {

  it('should remove falsy test cases', function(done) {
    const expected_result = [2,4,6,8,10,12];

    arrFilter(
      sampleArr,
      function (el, idx, arr, next) {

        // check if even number
        next(null, el % 2 === 0);

      }
    ).then(function(result) {
      expect(result).to.deep.equal(expected_result);
      done();
    }).catch(function(error) {
      done(error);
    });

  });

  it('should complete with error', function(done) {

    arrFilter(
      sampleArr,
      function (el, idx, arr, next) {

        // check if even number
        next(new Error('test error'));

      }).catch(function(error) {
        expect(error).to.be.instanceOf(Error);
        done();
      })

  });

  it('should complete with error for invalid filter function',function(done) {
    arrFilter([],null).catch(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
    });
  });

  it('should complete with error for invalid array input', function(done) {
    arrFilter(10,function () { }).catch(function (err) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );
  });

  it('should complete immediately for empty input arrays', function(done) {
    arrFilter([], function() {})
    .then(function(result) {
      expect(result.length).to.equal(0);
      done();
    })
    .catch(function(error){
      done(error);
    });
  });

  it('should keep the original array intact', function() {
    expect(sampleArr).to.deep.equal(sampleArrCopy);
  })
});