import json
import pathlib

import boto3
import pytest

BUCKET_NAME = 'test-bucket'


@pytest.fixture(scope='session')
def client():
    client = boto3.client('s3',
                          aws_access_key_id='dummy',
                          aws_secret_access_key='dummy',
                          region_name='ap-northeast-1',
                          endpoint_url='http://localhost:4572')

    return client


@pytest.fixture(scope='session')
def create_bucket(client, request):
    def fin():
        objects = client.list_objects_v2(Bucket=BUCKET_NAME)
        for obj in objects.get('Contents'):
            client.delete_object(Bucket=BUCKET_NAME, Key=obj.get('Key'))
        else:
            client.delete_bucket(Bucket=BUCKET_NAME)
    request.addfinalizer(fin)
    client.create_bucket(Bucket=BUCKET_NAME)


@pytest.fixture(scope='session')
def event():
    event_path = str(pathlib.Path(__file__).parent.joinpath('fixtures/event.json').resolve())
    with open(event_path, mode='r') as f:
        return json.loads(f.read())
