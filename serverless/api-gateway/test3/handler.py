from __future__ import print_function
import json


def hello(event, context):
    print(event)
    response = {}
    response['statusCode'] = 200
    response['headers'] = {'Access-Control-Allow-Origin': '*'}
    response['headers'] = {'Access-Control-Allow-Credentials': True}
    response['body'] = json.dumps({'message': 'Hello World!'})

    return response
