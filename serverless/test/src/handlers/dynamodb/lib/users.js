const AWS = require('aws-sdk');

class Users {
  constructor(table) {
    this.table = table;
    this.dynamodb = new AWS.DynamoDB();
  }

  putData(email) {
    const params = {
      TableName: this.table,
      Item: { 'email': { 'S': email } },
    };

    return this.dynamodb.putItem(params).promise();
  }

  getData(email) {
    const params = {
      TableName: this.table,
      Key: { 'email': { 'S': email } },
    };

    return this.dynamodb.getItem(params).promise();
  }

  deleteData(email) {
    const params = {
      TableName: this.table,
      Key: { 'email': { 'S': email } },
    };

    return this.dynamodb.deleteItem(params).promise();
  }
}

module.exports = Users;
