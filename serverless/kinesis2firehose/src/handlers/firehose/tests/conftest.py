import json
import pathlib

import pytest


@pytest.fixture(scope='session')
def event():
    event_path = str(pathlib.Path(__file__).parent.joinpath('fixtures/event.json').resolve())
    with open(event_path, mode='r') as f:
        return json.loads(f.read())
