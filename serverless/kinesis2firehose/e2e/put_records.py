import time
import uuid

import boto3

CLIENT = boto3.client('kinesis')


def main():

    while True:
        response = CLIENT.put_records(
            Records=records(),
            StreamName=stream()
        )

        print(response)
        time.sleep(1)


def stream():
    return CLIENT.list_streams().get('StreamNames')[0]


def records():
    return [{'Data': payload(), 'PartitionKey': 'shardId-000000000000'} for i in range(3)]


def payload():
    return '{0}: {1}'.format('test', uuid.uuid4())


if __name__ == '__main__':
    main()
