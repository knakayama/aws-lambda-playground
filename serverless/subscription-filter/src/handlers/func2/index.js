const zlib = require('zlib');

exports.handler = (event, context, callback) => {
  const data = new Buffer(event.awslogs.data, 'base64');
  zlib.gunzip(data, (err, result) => {
    if (err) callback(err);
    console.log(JSON.parse(result.toString('utf-8')));
    callback();
  });
};
