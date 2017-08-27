module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));

  const request = event.Records[0].cf.request;

  if (request.uri !== '/index.html') {
    console.log(`changing ${request.uri} to rewrite.html`);
    request.uri = '/rewrite.html';
  }

  callback(null, request);
};
