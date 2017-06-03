const Put = require('./lib/put.class');

module.exports.handler = (event, context, callback, awsConfig = {}) => {
  const put = new Put(event, context, callback, awsConfig);
  put.dynamoDBPut();
};
