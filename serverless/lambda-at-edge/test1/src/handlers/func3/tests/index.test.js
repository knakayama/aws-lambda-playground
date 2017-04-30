let event = {
  Records: [
    {
      cf: {
        request: {
          httpVersion: '2.0'
        }
      }
    }
  ]
};

let context = {
  succeed: function(data){console.log(JSON.stringify(data,' ',4));},
  fail: function(data){console.log("fail!!\n" + JSON.stringify(data,' ',4));},
  invokedFunctionArn: 'test:development',
  functionName: 'test',
  functionVersion: '$LATEST'
};

let callback = (err, data) => {
  if (err) console.log(err);
  console.log(JSON.stringify(data));
};

let myLambda = require('../index.js');
myLambda.handler(event, {}, callback);
