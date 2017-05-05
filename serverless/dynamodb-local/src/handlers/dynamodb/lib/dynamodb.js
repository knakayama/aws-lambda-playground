class DynamoDB {
  constructor(documentClient, tableName, item) {
    this.documentClient = documentClient;
    this.tableName = tableName;
    this.item = item;
  }

  put(item) {
    const params = {
      TableName: this.tableName,
      Item: this.item,
    };

    return this.documentClient.put(params).promise();
  }

  scan() {
    const params = {
      TableName: this.tableName,
    };

    return this.documentClient.scan(params).promise();
  }
}

module.exports = DynamoDB;
