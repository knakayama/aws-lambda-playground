const AWS = require('aws-sdk');

class Put {
  constructor(event, context, callback, awsConfig) {
    this.event = event;
    this.context = context;
    this.callback = callback;
    this.tableName = process.env.TABLE_NAME;
    this.documentClient = new AWS.DynamoDB.DocumentClient(awsConfig);
  }

  static errHandler(err) {
    return new Promise((resolve, reject) => {
      // すでにプライマリキーが存在する場合はresolve
      if (err.code === 'ConditionalCheckFailedException') {
        resolve({ errorType: err.code });
      }
      // それ以外(別の問題が発生している場合)はreject
      reject(err);
    });
  }

  dynamoDBPut() {
    const params = {
      TableName: this.tableName,
      Item: {
        DeviceId: 'aaa-bbb-ccc', // 疑似device id
        BeaconIdTimestamp: 'xxx-yyy-zzz', // 同上
      },
      ConditionExpression: 'attribute_not_exists(DeviceId)', // パーティションキーのみ指定しているが、プライマリキー全体を評価する
    };

    this.documentClient.put(params).promise()
      .then(() => this.callback()) // Lambdaが1回目に起動された場合はここで処理が終了する
      .catch(err => Put.errHandler(err)) // 2回目以降の処理
      .then(data => this.callback(null, data)) // ConditionalCheckFailedExceptionが発生した場合はここで終了
      .catch((err) => { // それ以外の場合
        console.log(err);
        this.callback(err);
      });
  }
}

module.exports = Put;
