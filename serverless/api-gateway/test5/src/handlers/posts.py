from __future__ import print_function
import os
import json
import boto3
import botocore

dynamodb = boto3.client('dynamodb')
TABLE_NAME = os.environ['TableName']


def put_item(body):
    return dynamodb.put_item(
            TableName=TABLE_NAME,
            Item={'UserId': {'N': body['user_id']}, 'UserName': {'S': body['user_name']}})


def get_item(user_id, user_name):
    return dynamodb.get_item(
            TableName=TABLE_NAME,
            Key={'UserId': {'N': user_id}, 'UserName': {'S': user_name}})


def create(event, context):
    print(event)
    response = {}
    response['statusCode'] = 200
    response['headers'] = {'x-custom-header': 'My Header Value'}
    try:
        resp = put_item(event['body'])
    except botocore.exceptions.ClientError as e:
        response['body'] = json.dumps(e.response['Error'])
    else:
        response['body'] = json.dumps(resp['ResponseMetadata'])

    return response


def detail(event, context):
    print(event)
    response = {}
    response['statusCode'] = 200
    response['headers'] = {'x-custom-header': 'My Header Value'}
    try:
        resp = get_item(event['path']['user_id'], event['query']['user_name'])
    except botocore.exceptions.ClientError as e:
        response['body'] = json.dumps(e.response['Error'])
    else:
        response['body'] = json.dumps(resp)

    return response
