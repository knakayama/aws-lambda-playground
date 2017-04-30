'use strict';

exports.handler = (event, context, callback) => {
  console.log(event);

  let response = event.Records[0].cf.response;
  let headers = response.headers;
  let customHeaderName = 'X-Amz-Meta-Last-Modified';
  let headerNameToBeChanged = 'Last-Modified';

  if (headers.customHeaderName) {
    headers.headerNameToBeChanged = headers.customHeaderName;
    console.log(`Set response header '${headerNameToBeChanged}' to '${headers.customHeaderName}'`);
  }
  callback(null, response);
}
