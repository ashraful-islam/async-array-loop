'use strict';

const arrForeach = require('./../foreach-promise');
const { expect } = require('chai');

const sampleArr = [2,3,4,5,6,7,8,9,10,11,12];
const sampleArrCopy = [2,3,4,5,6,7,8,9,10,11,12];

describe('foreach:promise', function() {

  it('should resolve without error', function(done) {

    arrForeach(
      sampleArr,
      function (el, idx, arr, next) {

        // some iteration should take place here
        next(null);

      }
    ).then(function(result) {
      expect(result).to.be.undefined;
      done();
    }).catch(function(error) {
      done(err);
    })
  });

  it('should complete with error', function(done) {

    arrForeach(
      sampleArr,
      function (el, idx, arr, next) {

        // return an error to terminate
        next(new Error('test error'));

      }).then(function(result) {
        expect(result).to.be.undefined;
        done();
      }).catch(function(error) {
        expect(error).to.be.instanceOf(Error);
        done();
      });

  });

  it('should complete with error for invalid array input', function(done) {
    arrForeach({}, function() {}).catch(function (error) {
      expect(error).to.be.instanceOf(Error);
      done();
    });
  });

  it('should keep the original array intact', function() {
    expect(sampleArr).to.deep.equal(sampleArrCopy);
  })
});