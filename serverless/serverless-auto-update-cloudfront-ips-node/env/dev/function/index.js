'use strict';

exports.handler = (event, context, callback) => {
  console.log('start');
  console.log('event: %j', event);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
      input : event,
    }),
  };

  callback(null, response);
};
