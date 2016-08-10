from __future__ import print_function
import os
import time
import boto3

client = boto3.client('dynamodb')

TABLE_NAME = os.environ["TableName"]
STRING = "test"


def lock(table_name, string):
    try:
        client.put_item(
            TableName=table_name,
            Item={
                "Key": {"S": string}
            },
            Expected={
                "Key": {"Exists": False}
            }
        )
        return True
    except Exception, e:
        print(e)
        return False


def unlock(table_name, string):
    client.delete_item(
        TableName=table_name,
        Key={
            "Key": {"S": string}
        }
    )


def handle(event, context):
    result = lock(TABLE_NAME, STRING)
    print(result)

    if not result:
        print("Locked. Nothing to do.")
        return

    time.sleep(15)
    unlock(TABLE_NAME, STRING)
