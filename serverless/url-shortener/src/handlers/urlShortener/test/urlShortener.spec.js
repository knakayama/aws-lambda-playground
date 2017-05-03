const expect = require('chai').expect;

const AWS = require('aws-sdk-mock');

const UrlShortener = require('../lib/urlShortener');

//AWS.setSDK(path.resolve('./node_modules/aws-sdk'));

describe('UrlShortener', () => {
  const s3Bucket = 'example-bucket';
  const s3Prefix = 'u';
  const event = {
    url_long: 'http://example.com/',
    cdn_prefix: 'example.cloudfront.net',
  };
  let urlShortener;

  beforeEach(() => {
     urlShortener = new UrlShortener(s3Bucket, s3Prefix, event);
  });

  describe('#constructor', () => {
    it('has valid property', () => {
      expect(urlShortener.s3Bucket).to.be.a('string');
      expect(urlShortener.s3Bucket).to.equal('example-bucket');
      expect(urlShortener.s3Prefix).to.be.a('string');
      expect(urlShortener.s3Prefix).to.equal('u');
      expect(urlShortener.urlLong).to.be.a('string');
      expect(urlShortener.urlLong).to.equal('http://example.com/');
      expect(urlShortener.cdnPrefix).to.be.a('string');
      expect(urlShortener.cdnPrefix).to.equal('example.cloudfront.net');
    });
  });

  describe('#key', () => {
    it('returns s3 key', () => {
      expect(urlShortener.key()).to.be.a('string');
      expect(urlShortener.key()).to.include('u/');
      expect(urlShortener.key()).to.have.lengthOf(6);
    });
  });

  //describe('#s3HeadObject', () => {
  //  it('return params', () => {
  //    const s3Bucket = 'example-bucket';
  //    const s3Prefix = 'u';
  //    const event = {
  //      url_long: 'http://example.com/',
  //      cdn_prefix: 'example.cloudfront.net',
  //    };

  //    const urlShortener = new UrlShortener(s3Bucket, s3Prefix, event);

  //    AWS.mock('S3', 'headObject', (params, callback) => {
  //      callback(new Error('NotFound'));
  //      //callback(null, 'NotFound');
  //      //callback(params);
  //    });

  //    AWS.restore('S3', 'headObject');

  //    const params = {
  //      Bucket: 'example-bucket',
  //      Key: urlShortener.key(),
  //    };

  //    return urlShortener.headObject(params).then((res, a) => {
  //      expect(a).to.be.a('object');
  //    });
  //    //expect(urlShortener.s3HeadObject()).to.have.property('Bucket');
  //    //expect(urlShortener.s3HeadObject()).to.have.property('Key');
  //    //expect(urlShortener.s3HeadObject()).to.have.property('WebsiteRedirectLocation');
  //    //expect(urlShortener.s3HeadObject()).to.have.property('ContentType');

  //  });
  //});

  //describe('#createS3Redirect', () => {
  //  before(() => {
  //    AWS.restore('S3');
  //  });

  //  it('Creates s3 redirect', () => {
  //    const params = {
  //      Bucket: 'example-bucket',
  //      Key: `u/${Math.random().toString(36).slice(-4)}`,
  //    };
  //    AWS.mock('S3', 'putObject', (params, callback) => {
  //      callback(null, 'success');
  //    });

  //    const s3Bucket = 'example-bucket';
  //    const s3Prefix = 'u';
  //    const event = {
  //      url_long: 'http://example.com/',
  //      cdn_prefix: 'example.cloudfront.net',
  //    };

  //    const urlShortener = new UrlShortener(s3Bucket, s3Prefix, event);

  //    expect(urlShortener.createS3Redirect()).to.be.a('object');
  //  });
  //});
});
