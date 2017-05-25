const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid');

const tableName = process.env.TABLE_NAME;

function putTodo(time) {
  const params = {
    TableName: tableName,
    Item: {
      StorageName: 'SimpleTodoList',
      DataName: time,
      Data: uuid(),
    },
  };

  return dynamodb.put(params).promise();
};

module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));

  for (let i = 0; i < 10; i++) {
    putTodo(event.time).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })
  };
  callback(null, {statusCode: 200});
};
