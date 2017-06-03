const AWS = require('aws-sdk');

class Put {
  constructor(event, context, callback, awsConfig) {
    this.event = event;
    this.context = context;
    this.callback = callback;
    this.tableName = process.env.TABLE_NAME;
    this.documentClient = new AWS.DynamoDB.DocumentClient(awsConfig);
    this.date = new Date();
  }

  dynamoDBPut() {
    const params = {
      TableName: this.tableName,
      Item: {
        DeviceId: this.date.getMinutes() % 2 === 1 ? 1 : 2,
        ISOString: this.date.toISOString(),
        Test: 'Test',
      },
    };

    this.documentClient.put(params).promise()
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

module.exports = Put;
