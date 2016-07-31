from __future__ import print_function
import os
import boto3
import pprint

from boto3.dynamodb.conditions import Key, Attr

pp = pprint.PrettyPrinter()


class DynamoDB(object):

    def __init__(self, table_name):
        self.client = boto3.resource("dynamodb")
        self.table = self.client.Table(table_name)

    def describe_table(self):
        return self.client.describe_table(
                TableName=self.table_name
                )

    def scan(self):
        return self.table.scan()

    def query(self):
        return self.table.query(
                KeyConditionExpression=Key("GameTitle").eq("game2")
                )

    def get_item(self, key):
        return self.table.get_item(
                Key=key
                )

    def update_item(self, key):
        return self.table.update_item(
                Key=key
                )

    def put_item(self, item):
        return self.table.put_item(
                Item=item)


def handle(event, context):
    dynamodb = DynamoDB(os.environ["TableName"])

    #pp.pprint(dynamodb.put_item(
    #    {"UserId": "test2", "GameTitle": "game2", "TopScore": 2}
    #    ))
    #pp.pprint(dynamodb.update_item(
    #    {"UserId": {"S": "test1"}, "GameTitle": {"S": "game1"}, "TopScore": {"N": "1"}}
    #    ))
    #pp.pprint(dynamodb.describe_table())
    pp.pprint(dynamodb.scan())
    pp.pprint(dynamodb.get_item(
        {"UserId": "test2", "GameTitle": "game2"}
        ))
    #pp.pprint(dynamodb.query())
