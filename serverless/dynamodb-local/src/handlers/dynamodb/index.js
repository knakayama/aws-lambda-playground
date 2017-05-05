const tableName = process.env.TABLE_NAME;

const AWS = require('aws-sdk');

const DynamoDB = require('./lib/dynamodb');

exports.handler = (event, context, callback) => {
  let documentClient;

  if ('isOffline' in event && event.isOffline === true) {
    documentClient = new AWS.DynamoDB.DocumentClient({
      endpoint: `http://localhost:${process.env.PORT}`,
    });
  } else {
    documentClient = new AWS.DynamoDB.DocumentClient();
  }

  const item = {
    email: event.email,
  };

  const dynamoDB = new DynamoDB(documentClient, tableName, item);
  dynamoDB.put(item).then((data) => {
    return dynamoDB.scan();
  }).then((data) => {
    callback(null, JSON.stringify(data));
  }).catch((err) => {
    callback(JSON.stringify(err));
  })
};
