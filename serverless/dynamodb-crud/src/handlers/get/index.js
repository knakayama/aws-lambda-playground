const Get = require('./lib/get.class');

module.exports.handler = (event, context, callback, awsConfig = {}) => {
  const get = new Get(event, context, callback, awsConfig);
  get.dynamoDBGet();
};
