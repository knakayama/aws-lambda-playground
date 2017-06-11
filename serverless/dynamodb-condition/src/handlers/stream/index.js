const Stream = require('./stream');

module.exports.handler = (event, context, callback) => {
  new Stream(event, context, callback).dynamoDBStream();
};
