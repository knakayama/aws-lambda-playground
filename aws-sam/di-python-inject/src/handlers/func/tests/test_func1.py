import boto3
import pytest

from func1 import Func1


@pytest.mark.usefixtures('create_table')
def test_injected_dynamodb(monkeypatch):
    dynamodb = boto3.resource('dynamodb', endpoint_url='http://localhost:4569').Table('test')
    monkeypatch.setenv('TABLE_NAME', 'test')
    Func1({}, {}).main()

    assert dynamodb.scan().get('Count') == 1
