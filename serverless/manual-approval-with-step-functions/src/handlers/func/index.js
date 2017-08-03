const aws = require('aws-sdk');

const stepfunctions = new aws.StepFunctions();

const ses = new aws.SES({ region: 'us-east-1' });

module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));
  const taskParams = {
    activityArn: process.env.ACTIVITY_ARN,
  };

  stepfunctions.getActivityTask(taskParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback('An error occured while calling getActivityTask.');
    } else if (data === null) {
      // No activities scheduled
      console.log('No activities.');
      callback(null, 'No activities received after 60 seconds.');
    } else {
      console.log(data);
      const input = JSON.parse(data.input);
      const emailParams = {
        Destination: {
          ToAddresses: [
            input.managerEmailAddress,
          ],
        },
        Message: {
          Subject: {
            Data: 'Your Approval Needed for Promotion!',
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: 'Hi!<br />' +
                `${input.employeeName} has been nominated for promotion!<br />` +
                'Can you please approve:<br />' +
                `${process.env.SERVICE_ENDPOINT}/succeed?taskToken=${encodeURIComponent(data.taskToken)}<br />` +
                'Or reject:<br />' +
                `${process.env.SERVICE_ENDPOINT}/fail?taskToken=${encodeURIComponent(data.taskToken)}`,
              Charset: 'UTF-8',
            },
          },
        },
        Source: input.managerEmailAddress,
        ReplyToAddresses: [
          input.managerEmailAddress,
        ],
      };

      ses.sendEmail(emailParams, (sesErr, sesData) => {
        if (sesErr) {
          console.log(sesErr, sesErr.stack);
          callback('Internal Error: The email could not be sent.');
        } else {
          console.log(sesData);
          callback(null, 'The email was successfully sent.');
        }
      });
    }
  });
};
