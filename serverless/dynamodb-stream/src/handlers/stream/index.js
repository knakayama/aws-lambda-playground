const Stream = require('./lib/stream.class');

module.exports.handler = (event, context, callback) => {
  const stream = new Stream(event, context, callback);
  stream.dynamoDBStream();
};
