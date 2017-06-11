const AWS = require('aws-sdk');

const uuid = require('uuid');

class Put {
  constructor(event, context, callback, awsConfig) {
    this.event = event;
    this.context = context;
    this.callback = callback;
    this.tableName = process.env.TABLE_NAME;
    this.documentClient = new AWS.DynamoDB.DocumentClient(awsConfig);
    this.dt = new Date();
  }

  dynamoDBPut() {
    const params = {
      TableName: this.tableName,
      Item: {
        Artist: this.dt.getMinutes() % 2 === 1 ? 'Bob' : 'Smith',
        SongTitle: uuid(),
      },
      ConditionExpression: 'attribute_not_exists(Artist)'
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
