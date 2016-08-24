from __future__ import print_function
import json


def handle(event, context):
    print(json.dumps(event))
    return {"sourceIp": event["sourceIp"]}
