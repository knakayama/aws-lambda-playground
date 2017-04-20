'use strict';

var expect = require('chai').expect;
var LambdaTester = require('lambda-tester');
var myLambda = require('../index');

describe('myLambda', function() {
  ['Richard', 'rhyatt'].forEach(function(validName) {
    it('successful invocation: name=' + validName, function(done) {
      LambdaTester(myLambda.handler)
        .event({name: validName})
        .expectSucceed(function(result) {
          expect(result.valid).to.be.true;
        })
        .verify(done);
    });
  });

  ['Fred', undefined].forEach(function(invalidName) {
    it('fail: when name is invalid: name=' + invalidName, function(done) {
      LambdaTester(myLambda.handler)
        .event({name: invalidName})
        .expectFail(function(err) {
          expect(err.message).to.equal('unknown name');
        })
        .verify(done);
    });
  });
});
