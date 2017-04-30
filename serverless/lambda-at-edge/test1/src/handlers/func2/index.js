'use strict';

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  if (request.uri !== '/experiment-pixel.jpg') {
    // do not process if this is not an A-B test request
    callback(null, request);
  } else {
    const experimentCookieName = 'X-Experiment-Name=';

    const groupA = 'A';
    const groupB = 'B';

    const groupAObject = '/experiment-group/control-pixel.jpg';
    const groupBObject = '/experiment-group/treatment-pixel.jpg';

    /*
     * Lambda at the Edge headers are array objects.
     * Client may send multiple Cookie headers, i.e.:
     * > GET /viewerRes/test HTTP/1.1
     * > User-Agent: curl/7.18.1 (x86_64-unknown-linux-gnu) libcurl/7.18.1 OpenSSL/1.0.1u zlib/1.2.3
     * > Cookie: First=1; Second=2
     * > Cookie: ClientCode=abc
     * > Host: example.com
     * You can access the first Cookie line by
     *  headers["Cookie"][0]
     * and the second by
     *  headers["Cookie"][1]
     *   headers["Cookie"][0] will return "First=1; Second=2", cookie tokens are not parsed
     * separately.
     */
    let modifiedUri = false;
    if (headers.Cookie) {
      for (let i = 0; i < headers.Cookie.length; i++) {
        const experimentIndex = headers.Cookie[i].indexOf(experimentCookieName);
        console.error(experimentIndex);
        if (experimentIndex >= 0) {
          if (headers.Cookie[i][experimentIndex + experimentCookieName.length] === groupA) {
            request.uri = groupAObject;
            modifiedUri = true;
          } else if (headers.Cookie[i][experimentIndex + experimentCookieName.length] === groupB) {
            request.uri = groupBObject;
            modifiedUri = true;
          }
        }
      }
    }

    /*
     * If this is the first time the viewer is
     * requesting this or we have not found
     * the experiment cookies,
     * randomly distribute viewers between objects.
     */
    if (!modifiedUri) {
      if (Math.random() < 0.75) {
        // 75% of the viewers go to group A.
        request.uri = groupAObject;
      } else {
        request.uri = groupBObject;
      }
    }

    console.log(`Request uri set to "${request.uri}"`);
    callback(null, request);
  }
};
