from __future__ import print_function
import json


def handler(event, context):
    print(event)
    response = {}
    response['statusCode'] = 200
    response['headers'] = {'x-custom-header': 'My Header Value'}
    response['body'] = json.dumps({'message': 'Hello World!'})

    return response
