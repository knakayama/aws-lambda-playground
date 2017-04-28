const Hello = require('./lib/hello.class.js');
const hello = new Hello();

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: hello.say(),
      input: event
    }),
  };

  callback(null, response);
};
