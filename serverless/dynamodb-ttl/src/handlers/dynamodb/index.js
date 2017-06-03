const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.scan = (event, context, callback) => {
  const params = {
    TableName: process.env.TableName
  };

  documentClient.scan(params).promise()
    .then((data) => {
      console.log(data);
      callback(null, data);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
};

module.exports.put = (event, context, callback) => {
  const moment = require('moment-timezone');
  const jst = moment().tz('Asia/Tokyo');

  const params = {
    TableName: process.env.TableName,
    Item: {
      ttl: jst.unix(),
      time: jst.toString(),
    }
  };

  documentClient.put(params).promise()
    .then((data) => {
      console.log(data);
      callback(null, data);
    })
    .catch((err) => {
      console.log(err)
      callback(err);
    })
};
