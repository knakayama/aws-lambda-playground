from __future__ import print_function
import json


def hello(event, context):
    print(event)
    print(context)
    response = {}
    response['statusCode'] = 200
    response['headers'] = {'x-custom-header': 'My Header Value'}
    response['body'] = json.dumps({'httpMethod': event['httpMethod']})

    return response
