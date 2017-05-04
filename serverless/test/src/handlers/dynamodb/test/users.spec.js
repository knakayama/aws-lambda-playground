'use strict'

const AWS = require('aws-sdk-mock');
const Users = require('../lib/users');
const chai = require('chai');
const should = chai.should();

describe('Users', () => {
  afterEach(() => {
    AWS.restore('DynamoDB');
  });

  it('putItem', () => {
    AWS.mock('DynamoDB', 'putItem', (params, callback) => {
      callback(null, 'successfully put item in database');
    });

    return new Users('Table').putData().then((res) => {
      res.should.equal('successfully put item in database');
    });
  })

  it('getItem', () => {
    const input = 'hoge@example.com';

    AWS.mock('DynamoDB', 'getItem', (params, callback) => {
      callback(null, { Item: { email: params.Key.email.S } });
    });

    return new Users('Table').getData(input).then((res) => {
      res.Item.email.should.equal(input);
    });
  })

  it('deleteItem', () => {
    const input = 'hoge@example.com';

    AWS.mock('DynamoDB', 'deleteItem', (params, callback) => {
      callback(null, 'successfully delete item in database');
    });

    return new Users('Table').deleteData(input).then((res) => {
      res.should.equal('successfully delete item in database');
    });
  })
})
