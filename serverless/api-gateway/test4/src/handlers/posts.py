from __future__ import print_function
import os
import json
import boto3
import botocore

dynamodb = boto3.client('dynamodb')


def put_item(number):
    return dynamodb.put_item(
            TableName=os.environ['TableName'],
            Item={'User': {'N': number}})


def create(event, context):
    print(event)
    response = {}
    response['statusCode'] = 200
    response['headers'] = {'x-custom-header': 'My Header Value'}
    try:
        if event['queryStringParameters']:
            resp = put_item(event['queryStringParameters'].split('=')[-1])
        else:
            resp = put_item(event['body'].split('=')[-1])
    except botocore.exceptions.ClientError as e:
        response['body'] = json.dumps(e.response['Error'])
    else:
        response['body'] = json.dumps(resp['ResponseMetadata'])

    return response
