module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'api-gateway-test1'
    }),
  };
  callback(null, response);
};
