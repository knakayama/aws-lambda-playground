from __future__ import print_function
import os
import boto3

TOPIC_ARN = os.environ["TopicArn"]


def handle(event, context):
    client = boto3.client('sns')
    req = {}
    req.update({
        "TopicArn": TOPIC_ARN,
        "Message": "test",
        "Subject": "test"
        })
    print(client.publish(**req))
