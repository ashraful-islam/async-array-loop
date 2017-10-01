'use strict';

const arrReduce = require('./../reduce-promise');
const { expect } = require('chai');

const sampleArr = [1,2,3,4,5];
const sampleArrCopy = [1,2,3,4,5];

describe('reduce:promise', function() {

  it('should reduce correctly', function(done) {
    const expected_result = 15;

    arrReduce(
      sampleArr,
      function (prevValue, nextValue, next) {

        // return sum
        next(null, prevValue + nextValue);

      }
    ).then(function(result) {
      expect(result).to.equal(expected_result);
      done();
    }).catch(function(error) {
      done(error);
    });
  });

  it('should work with initial value', function(done) {
    const expected_result = 25;
    const initial_value = 10;

    arrReduce(
      sampleArr,
      function(prevValue, nextValue, next) {
        next(null, prevValue + nextValue)
      },
      initial_value
    ).then(function (result) {
      expect(result).to.equal(expected_result);
      done();
    }).catch(function (error) {
      done(error);
    });
  });

  it('should complete with error', function(done) {
    arrReduce(sampleArr,function (prevValue, nextValue, next) {

      // return an error
      next(new Error('test error'));

    }).catch(function (err, result) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should complete with error for invalid map function',function(done) {
    arrReduce([],null).catch(function (err) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should complete with error for invalid array input', function(done) {
    arrReduce("hello",function ( ) { }).catch(function (err) {
      expect(err).to.be.instanceof(Error);
      done();
    });

  });

  it('should keep the original array intact', function() {
    expect(sampleArr).to.deep.equal(sampleArrCopy);
  });
});