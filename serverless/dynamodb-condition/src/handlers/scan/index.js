const Scan = require('./scan');

module.exports.handler = (event, context, callback, awsConfig = {}) => {
  new Scan(event, context, callback, awsConfig).dynamoDBScan();
};
