const im = require('imagemagick');

const AWS = require('aws-sdk');

module.exports.handler = (event, context, callback) => {
  console.log(event);
  const s3 = new AWS.S3();
  const key = event.path.filename;
  const bucket = process.env.BUCKET_NAME;
  const params = {
    Bucket: bucket,
    Key: key,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
      const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
      console.log(message);
      callback(message);
    } else {
      console.log(data.Body);
      console.log(`CONTENT TYPE: ${data.ContentType}`);

      im.resize({
        srcData: data.Body,
        format: 'png',
        width: event.query.w,
      }, (err, stdout) => {
        if (err) {
          callback('resize failed', err);
        } else {
          console.log('resized!');
          callback(null, new Buffer(stdout, 'binary').toString('base64'));
        }
      });
    }
  });
};
