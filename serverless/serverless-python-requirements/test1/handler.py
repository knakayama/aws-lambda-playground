from datetime import datetime
import requirements
import pytz


def hello(event, context):
    return str(datetime.now(pytz.utc).astimezone(pytz.timezone('Asia/Tokyo')))
