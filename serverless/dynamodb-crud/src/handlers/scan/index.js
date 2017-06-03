const Scan = require('./lib/scan.class');

module.exports.handler = (event, context, callback, awsConfig = {}) => {
  const scan = new Scan(event, context, callback, awsConfig);
  scan.dynamoDBScan();
};
