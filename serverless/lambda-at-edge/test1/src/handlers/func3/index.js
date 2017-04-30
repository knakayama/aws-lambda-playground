'use strict';

exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));

  const request = event.Records[0].cf.request;
  const response = {
    status: '302',
    statusDescription: '302 Found',
    httpVersion: request.httpVersion,
    headers: {
      Location: ['http://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html'],
    },
  };
  callback(null, response);
};
