const Get = require('./get');

module.exports.handler = (event, context, callback, awsConfig = {}) => {
  new Get(event, context, callback, awsConfig).dynamoDBGet();
};
