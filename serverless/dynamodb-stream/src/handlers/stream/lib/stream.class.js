class Stream {
  constructor(event, context, callback) {
    this.event = event;
    this.context = context;
    this.callback = callback;
  }

  dynamoDBStream() {
    console.log('Received event:', JSON.stringify(this.event));

    this.event.Records.forEach((record) => {
      console.log(record.eventID);
      console.log(record.eventName);
      console.log('DynamoDB Record: %j', record.dynamodb);
    });
    this.callback(null, `Successfully processed ${this.event.Records.length} records.`);
  }
}

module.exports = Stream;
