const UrlShortener = require('./lib/urlShortener');

exports.handler = (event, context, callback) => {
  const s3Bucket = process.env.S3_BUCKET;
  const s3Prefix = process.env.S3_PREFIX;
  const body = JSON.parse(event.body);
  const urlShortener = new UrlShortener(s3Bucket, s3Prefix, body.url_long, body.cdn_prefix);

  urlShortener.redirectObject().then((data) => {
    callback(null, data);
  }).catch((err) => {
    callback(err);
  });
};
