from __future__ import print_function
from datetime import datetime
import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'vendored'))
import pytz


def handler(event, context):
    print(pytz.timezone('Asia/Tokyo').localize(datetime.now()))
    print(event)
    return event
