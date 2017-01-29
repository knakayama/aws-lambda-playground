from __future__ import print_function
import json


def hello(event, context):
    print(event)
    #raise TestException('conflict')
    raise Exception('"statusCode":409,conflict')
    #response = {}
    #response['statusCode'] = 409
    #response['headers'] = {'x-custom-header': 'My Header Value'}
    #response['body'] = json.dumps({'errorMessage': 'Conflict'})


class TestException(Exception):
    def __init__(self, msg):
        self.msg = msg

    def __str__(self):
        return 'statusCode:409,{}'.format(self.msg)
