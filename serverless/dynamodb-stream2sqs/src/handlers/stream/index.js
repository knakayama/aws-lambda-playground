const AWS = require('aws-sdk');

const sqs = new AWS.SQS();

const queueUrl = process.env.QUEUE_URL;

function sendMessage(messageBody) {
  const params = {
    MessageBody: messageBody,
    QueueUrl: queueUrl,
  };

  return sqs.sendMessage(params).promise();
};

exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event));

  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
    const messageBody = { dynamodb: record.dynamodb };
    sendMessage(JSON.stringify(messageBody)).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
