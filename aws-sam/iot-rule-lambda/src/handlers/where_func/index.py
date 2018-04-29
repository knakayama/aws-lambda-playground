import os

import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')


def emit(flag):
    dict_ = {
        'isIllegal': flag
    }
    print(dict_)

    return dict_


def item_exists(device_id):
    table_name = os.environ['TABLE_NAME']
    params = {
        'KeyConditionExpression': Key('deviceId').eq(device_id)
    }

    resp = dynamodb.Table(table_name).query(**params)['Items']

    if resp:
        return True
    else:
        return False


def handler(event, context):
    flag = False

    try:
        flag = item_exists(event['deviceId'])
    except Exception as e:
        print(e)
    finally:
        return emit(flag)
