const AWS = require('aws-sdk');

const sns = new AWS.SNS();

module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));
  //our batch size is 1 record so loop expected to process only once
  event.Records.forEach((record) => {
    // Kinesis data is base64 encoded so decode here
    const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
    const rec = payload.split(',');
    const ctr = rec[0];
    const anomaly_score = rec[1];
    const detail = `Anomaly detected with a click through rate of ${ctr} % and an anomaly score of ${anomaly_score}`;
    const subject = 'Anomaly Detected';
    const params = {
      Message: detail,
      MessageStructure: 'String',
      Subject: subject,
      TopicArn: process.env.TOPIC_ARN,
    };

    sns.publish(params).promise()
      .then((data) => {
        console.log(JSON.stringify(data));
        callback(null, 'Published Notification');
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        callback(err);
      })
  });
};
