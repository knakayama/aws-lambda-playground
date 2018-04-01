import json
import os

import boto3

client = boto3.client('stepfunctions')


def handler(event, context):
    print(event)

    if event['Records'][0]['eventName'] != 'INSERT':
        return

    client.start_execution(
        stateMachineArn=os.environ['STATE_MACHINE_ARN'],
        input=json.dumps({'deviceId': event['Records'][0]['dynamodb']['NewImage']['deviceId']['S']})
    )
