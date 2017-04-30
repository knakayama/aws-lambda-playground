'use strict';

const Users = require('./lib/users');
const uuid = require('uuid');

exports.put = (event, context, callback) => {
  console.log(JSON.stringify(event));

  const user = new Users(process.env.TableName);
  const uuid_v1 = uuid.vi();

  user.putData(`${uuid_v1}@example.com`);
}
