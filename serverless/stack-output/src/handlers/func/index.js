const Func = require('./func');

module.exports.handler = (event, context, callback) => {
  new Func(event, context, callback).func();
};
