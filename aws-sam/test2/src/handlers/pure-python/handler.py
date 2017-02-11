from datetime import datetime
import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'vendored'))
import pytz


def hello(event, context):
    return str(datetime.now(pytz.utc).astimezone(pytz.timezone(os.environ['Timezone'])))
