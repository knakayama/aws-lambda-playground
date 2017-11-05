import sys
import pathlib

sys.path.append(str(pathlib.Path(__file__).parent.parent.resolve()))

from index import Firehose


def test_transform(event):

    firehose = Firehose(event, {})
    response = firehose.transform()

    for i, record in enumerate(response.get('records')):
        assert record.get('recordId') == event['records'][i]['recordId']
        assert record.get('result') == 'Ok'
        assert record.get('data') == event['records'][i]['data']
