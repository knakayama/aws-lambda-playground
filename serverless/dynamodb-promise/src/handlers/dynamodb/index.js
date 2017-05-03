const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

function fetchCurrentCount() {
  const param = {
    TableName: tableName,
    Key: {
      StorageName: 'SimpleTodoList',
      DataName: 'Count',
    },
  };
  return dynamodb.get(param).promise();
};

function putFirstCount() {
  const param = {
    TableName: tableName,
    Item: {
      StorageName: 'SimpleTodoList',
      DataName: 'Count',
      Data: { count: 1 },
    },
  };
  return dynamodb.put(param).promise();
}

function inclumentCount(count) {
  const param = {
    TableName: tableName,
    Key: {
      StorageName: 'SimpleTodoList',
      DataName: 'Count',
    },
    UpdateExpression: 'set #p1.#p2 = :plusone',
    ConditionExpression: '#p1.#p2 <= :lastvalue',
    ExpressionAttributeNames: {
      '#p1': 'Data',
      '#p2': 'count',
    },
    ExpressionAttributeValues: {
      ':lastvalue': count,
      ':plusone': count + 1,
    },
    ReturnValues: 'UPDATED_NEW',
  };
  return dynamodb.update(param).promise();
};

function putTodo(inclumentedCount, todo) {
  const param = {
    TableName: tableName,
    Item: {
      StorageName: 'SimpleTodoList',
      DataName: 'Todo_' + inclumentedCount,
      Data: todo,
    },
  };
  return dynamodb.put(param).promise();
};

exports.handler = (event, context, callback) => {
  if (!('message' in event && event.message !== '')) {
    callback(JSON.stringify({ result: 'ng' }));
  }

  const todo = {
    message: event.message,
  };

  fetchCurrentCount().then((data) => {
    const count = data.Item.Data.count;
    return inclumentCount(count);
  }).catch((err) => {
    return putFirstCount();
  }).then((data) => {
    return fetchCurrentCount();
  }).then((data) => {
    const inclumentedCount = data.Item.Data.count;
    return putTodo(inclumentedCount, todo);
  }).then((data) => {
    callback(null, JSON.stringify(data))
  }).catch((err) => {
    callback(JSON.stringify(err));
  })
};
