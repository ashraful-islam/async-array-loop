'use strict';

const arrForeach = require('./../foreach');
const { expect } = require('chai');

const sampleArr = [2,3,4,5,6,7,8,9,10,11,12];
const sampleArrCopy = [2,3,4,5,6,7,8,9,10,11,12];

describe('foreach', function() {

  it('should complete successfully', function(done) {

    arrForeach(
      sampleArr,
      function (el, idx, arr, next) {

        // some iteration should take place here
        next(null);

      },
      function oncomplete(err) {
        expect(err).to.be.undefined;
        done(err);
      }
    );


  });

  it('should complete with error', function(done) {

    arrForeach(
      sampleArr,
      function (el, idx, arr, next) {

        // return an error to terminate
        next(new Error('test error'));

      },
      function (err) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );

  });

  it('should complete with error for invalid array input', function(done) {
    arrForeach({},function () { },function (err) {
        expect(err).to.be.instanceof(Error);
        done();
      }
    );
  });

  it('should keep the original array intact', function() {
    expect(sampleArr).to.deep.equal(sampleArrCopy);
  })
});