'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.scan = (event, context, callback) => {
  let params = {
    TableName: process.env.TableName
  };

  documentClient.scan(params, (err, data) => {
    if (err) {
      console.log(err)
      callback(err);
    } else {
      console.log(data);
      callback(null, data);
    }
  });
};

module.exports.put = (event, context, callback) => {
  const moment = require('moment-timezone');
  let jst = moment().tz('Asia/Tokyo');

  let params = {
    TableName: process.env.TableName,
    Item: {
      ttl: jst.unix(),
      time: jst.toString(),
    }
  };

  documentClient.put(params, (err, data) => {
    if (err) {
      console.log(err)
      callback(err);
    } else {
      console.log(data);
      callback(null, data);
    }
  });
};
