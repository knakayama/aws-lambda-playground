const expect = require('chai').expect;
const Hello = require('../lib/hello.class.js');

describe('Hello', () => {
  let hello;

  beforeEach(() => {
    hello = new Hello();
  });

  describe('say', () => {
    it('should return the value',
        () => expect(hello.say())
        .to.be.equal('Your function executed successfully!'));
  });
});
