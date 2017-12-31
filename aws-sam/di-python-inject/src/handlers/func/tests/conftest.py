import boto3
import inject
import pytest

import config


def pytest_runtest_setup(item):
    inject.clear_and_configure(config.localhost)


@pytest.fixture(scope='session')
def dynamodb():
    return inject.instance(boto3.resource('dynamodb'))


@pytest.fixture
def create_table(dynamodb, request):
    dynamodb.create_table(TableName='test',
                          AttributeDefinitions=[{'AttributeName': 'userId', 'AttributeType': 'S'}],
                          KeySchema=[{'AttributeName': 'userId', 'KeyType': 'HASH'}],
                          ProvisionedThroughput={'ReadCapacityUnits': 1, 'WriteCapacityUnits': 1})

    def delete_table():
        dynamodb.Table('test').delete()
    request.addfinalizer(delete_table)
