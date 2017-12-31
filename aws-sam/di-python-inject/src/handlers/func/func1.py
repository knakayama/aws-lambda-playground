import os
import uuid

import boto3
import inject


class Func1(object):
    dynamodb = inject.attr(boto3.resource('dynamodb'))

    def __init__(self, event, context):
        self.event = event
        self.context = context
        self.table_name = os.getenv('TABLE_NAME')

    def _put_item(self):
        item = {'userId': str(uuid.uuid4())}
        return self.dynamodb.Table(self.table_name).put_item(Item=item)

    def main(self):
        return self._put_item()


if __name__ == '__main__':
    print(Func1({}, {}).main())
