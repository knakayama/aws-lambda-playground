import os
import base64

import boto3
import botocore


class Stream(object):
    def __init__(self, event, context, client):
        self.event = event
        self.context = context
        self.client = client
        self.bucket = os.environ.get('BUCKET_NAME')

    def put_object(self):
        try:
            for record in self.event.get('Records'):
                response = self.client.put_object(Bucket=self.bucket,
                                                  Key=self.format_key(record['kinesis']['sequenceNumber']),
                                                  Body=self.b64decode_with_newline(record['kinesis']['data']))
        except botocore.exceptions.ClientError as e:
            print(e)
            return {'message': e.message}
        else:
            print(response)
            return response

    def format_key(self, key):
        return '{0}.txt'.format(key)

    def b64decode_with_newline(self, data):
        return base64.b64decode('{0}\n'.format(data))


def handler(event, context):
    print(event)
    client = boto3.client('s3')
    stream = Stream(event, context, client)
    return stream.put_object()
