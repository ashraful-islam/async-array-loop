'use strict';

const arrMap = require('./../map-promise');
const { expect } = require('chai');

const sampleArr = [1,2,3,4];
const sampleArrCopy = [1,2,3,4];

describe('map:promise', function() {

  it('should map new values correctly', function(done) {
    const expected_result = [2,4,6,8];

    arrMap(
      sampleArr,
      function (el, idx, arr, next) {

        // return double of each element
        next(null, el * 2);

      }).then(function(result) {
        expect(result).to.deep.eq(expected_result);
        done();
      }).catch(function(error) {
        done(err);
      });
  });

  it('should complete with error', function(done) {

    arrMap(
      sampleArr,
      function (el, idx, arr, next) {

        // return an error
        next(new Error('test error'));

      }
    ).catch(function(error) {
        expect(error).to.be.instanceof(Error);
        done();
    });

  });

  it('should complete with error for invalid map function',function(done) {
    arrMap([],null).catch(function(error) {
      expect(error).to.be.instanceOf(Error);
      done();
    });
  });

  it('should complete with error for invalid array input', function(done) {
    arrMap({}, function () {}).catch(function(error) {
      expect(error).to.be.instanceOf(Error);
      done();
    });
  });

  it('should complete immediately for empty input arrays', function(done) {
    arrMap([], function() {})
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
  });
});