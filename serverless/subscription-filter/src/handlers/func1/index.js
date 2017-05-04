exports.handler = (event, context, callback) => {
  console.log(JSON.stringify({errorMessage: 'Test'}));
  callback();
};
