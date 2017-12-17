import json


def emit(message):
    return json.dumps(message)


def handler(event, context):
    print(event)

    message = {'device': {'id': 1}}
    return emit(message)
