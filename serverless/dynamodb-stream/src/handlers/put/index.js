const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

function putTodo(time) {
  const param = {
    TableName: tableName,
    Item: {
      StorageName: 'SimpleTodoList',
      DataName: time,
      Data: 'some todo',
    },
  };
  return dynamodb.put(param).promise();
};

exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));

  putTodo(event.time).then((data) => {
    callback(null, JSON.stringify(data));
  }).catch((err) => {
    callback(JSON.stringify(err));
  })
};
