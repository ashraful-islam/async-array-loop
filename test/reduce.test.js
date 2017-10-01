'use strict';

const arrReduce = require('./../reduce');
const { expect } = require('chai');

const sampleArr = [1,2,3,4,5];
const sampleArrCopy = [1,2,3,4,5];

describe('reduce', function() {

  it('should reduce correctly', function(done) {
    const expected_result = 15;

    arrReduce(
      sampleArr,
      function (prevValue, nextValue, next) {

        // return sum
        next(null, prevValue + nextValue);

      },
      function (err, result) {
        expect(result).to.deep.equal(expected_result);
        done(err);
      }
    );


  });

  it('should work with initial value', function(done) {
    const expected_result = 25;
    const initial_value = 10;
    arrReduce(
      sampleArr,
      function(prevValue, nextValue, next) {
        next(null, prevValue + nextValue)
      },
      function (err, result) {
        expect(result).to.equal(expected_result);
        done(err);
      },
      initial_value
    );

  });

  it('should complete with error', function(done) {

    arrReduce(
      sampleArr,
      function (prevValue, nextValue, next) {

        // return an error
        next(new Error('test error'));

      },
      function (err, result) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );

  });

  it('should complete with error for invalid map function',function(done) {
    arrReduce(
      [],
      null,
      function (err, result) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );
  });

  it('should complete with error for invalid array input', function(done) {
    arrReduce("hello",function ( ) { }, function (err, result) {
      expect(err).to.be.instanceof(Error);
      done();
    });

  });

  it('should immediately complete for empty array input', function(done) {
    arrReduce([], function() { }, function(err, result) {
      expect(result).to.be.undefined;
      done(err);
    });
  });

  it('should keep the original array intact', function() {
    expect(sampleArr).to.deep.equal(sampleArrCopy);
  });
});