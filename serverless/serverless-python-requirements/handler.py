from datetime import datetime
import requirements
import pytz


def hello(event, context):
    return str(datetime.now(pytz.timezone('Asia/Tokyo')))
