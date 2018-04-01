import os

import boto3

client = boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])


def handler(event, context):
    print(event)

    iterator = event['iterator']

    result = client.get_item(Key={'deviceId': event['deviceId']})
    print(result)

    if not result.get('Item'):
        return {'continue': False}

    index = iterator['index']
    step = iterator['step']
    count = iterator['count']
    index += step

    if index <= count:
        continue_ = True
    else:
        continue_ = False

    return {
        'index': index,
        'step': step,
        'count': count,
        'continue': continue_
    }
