const AWS = require('aws-sdk');

class Get {
  constructor(event, context, callback, awsConfig) {
    this.event = event;
    this.context = context;
    this.callback = callback;
    this.tableName = process.env.TABLE_NAME;
    this.documentClient = new AWS.DynamoDB.DocumentClient(awsConfig);
    this.dt = new Date();
  }

  dynamoDBGet() {
    const params = {
      TableName: this.tableName,
      // should be partition key or partition key and sort key
      Key: {
        Artist: this.dt.getMinutes() % 2 === 1 ? 'Bob' : 'Smith',
        SongTitle: '9f50e4b2-61c4-47b1-88d0-51690fd2e0b3',
      },
      // list attributes to return
      //AttributesToGet: [
      //  'Test',
      //],
      ReturnConsumedCapacity: 'INDEXES',
    };

    /*
       INDEXES
       "ConsumedCapacity": {
          "TableName": "<_YOUR_TABLE_NAME_>",
          "CapacityUnits": 0.5,
          "Table": {
            "CapacityUnits": 0.5
          }
        }

        TOTAL
        "ConsumedCapacity": {
          "TableName": "<_YOUR_TABLE_NAME_>",
          "CapacityUnits": 0.5
        }
        NONE => default
     */

    this.documentClient.get(params).promise()
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

module.exports = Get;
