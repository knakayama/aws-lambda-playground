const AWS = require('aws-sdk');

class UrlShortener {
  constructor(s3Bucket, s3Prefix, urlLong, cdnPrefix) {
    this.s3Bucket = s3Bucket;
    this.s3Prefix = s3Prefix;
    this.urlLong = urlLong;
    this.cdnPrefix = cdnPrefix;
    this.s3 = new AWS.S3();
  }

  headObject(key) {
    const params = {
      Bucket: this.s3Bucket,
      Key: key,
    };
    return this.s3.headObject(params).promise();
  }

  putObject(key) {
    const params = {
      Bucket: this.s3Bucket,
      Key: key,
      WebsiteRedirectLocation: this.urlLong,
      ContentType: 'text/plain',
    };
    return this.s3.putObject(params).promise();
  }

  body(key) {
    return {
      url_long: this.urlLong,
      url_short: `https://${this.cdnPrefix}/${key.split('/')[1]}`,
      error: null,
    };
  }

  key() {
    return `${this.s3Prefix}/${Math.random().toString(36).slice(-4)}`;
  }

  redirectObject() {
    return new Promise((resolve, reject) => {
      const key = this.key();
      const body = this.body(key);

      this.headObject(key).catch((err) => {
        console.log(err.code);
        return this.putObject(key);
      }).catch((err) => {
        body.error = err.code;
        reject({ statusCode: 500, body: JSON.stringify(body) });
      }).then(() => {
        resolve({ statusCode: 200, body: JSON.stringify(body) });
      });
    });
  }
}

module.exports = UrlShortener;
