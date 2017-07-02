class Func {
  constructor(event, context, callback) {
    this.event = event;
    this.context = context;
    this.callback = callback;
  }

  func() {
    this.callback(null, JSON.stringify({ message: 'stack-output-demo' }));
  }
}

module.exports = Func;
