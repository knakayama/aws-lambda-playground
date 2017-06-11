const Put = require('./put');

module.exports.handler = (event, context, callback, awsConfig = {}) => {
  new Put(event, context, callback, awsConfig).dynamoDBPut();
};
