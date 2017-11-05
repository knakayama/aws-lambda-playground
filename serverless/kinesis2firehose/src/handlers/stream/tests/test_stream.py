import os
import sys
import base64
import pathlib

import pytest

sys.path.append(str(pathlib.Path(__file__).parent.parent.resolve()))

from index import Stream

BUCKET_NAME = 'test-bucket'


@pytest.mark.usefixtures('create_bucket')
def test_put_object(client, event, monkeypatch):
    monkeypatch.setenv('BUCKET_NAME', BUCKET_NAME)

    stream = Stream(event, {}, client)
    response = stream.put_object()

    assert response.get('ResponseMetadata').get('HTTPStatusCode') == 200


def test_get_object(client, event, monkeypatch):
    monkeypatch.setenv('BUCKET_NAME', BUCKET_NAME)

    for record in event.get('Records'):
        event_base64_decoded = base64.b64decode(record['kinesis']['data'])
        key_formatted = '{0}.txt'.format(record['kinesis']['sequenceNumber'])

        response = client.get_object(Bucket=os.environ.get('BUCKET_NAME'),
                                     Key=key_formatted)
        body = response.get('Body').read()

        assert body == event_base64_decoded
