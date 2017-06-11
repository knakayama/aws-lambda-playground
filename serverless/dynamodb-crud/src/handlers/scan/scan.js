const AWS = require('aws-sdk');

class Scan {
  constructor(event, context, callback, awsConfig) {
    this.event = event;
    this.context = context;
    this.callback = callback;
    this.tableName = process.env.TABLE_NAME;
    this.documentClient = new AWS.DynamoDB.DocumentClient(awsConfig);
  }

  dynamoDBScan() {
    const params = {
      TableName: this.tableName,
    };

    this.documentClient.scan(params).promise()
      .then((data) => {
        console.log(data);
        this.callback(null, data);
      })
      .catch((err) => {
        console.log(err);
        this.callback(err);
      });
  }
}

module.exports = Scan;
