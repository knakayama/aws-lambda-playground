from __future__ import print_function
import datetime
import boto3
import time
import os

lambda_name = os.environ['FunctionName']
log_group_name = '/aws/lambda/' + lambda_name
s3_bucket_name = os.environ['S3BucketName']
s3_prefix = lambda_name + '/' + str(datetime.date.today() - datetime.timedelta(days=1))
client = boto3.client('logs')


def get_from_timestamp():
    today = datetime.date.today()
    yesterday = datetime.datetime.combine(today - datetime.timedelta(days=1), datetime.time(0, 0, 0))
    timestamp = time.mktime(yesterday.timetuple())
    return int(timestamp)


def get_to_timestamp(from_ts):
    return from_ts + (60 * 60 * 24) - 1


def handler(event, context):
    from_ts = get_from_timestamp()
    to_ts = get_to_timestamp(from_ts)
    print('Timestamp: from_ts {}, to_ts {}'.format(from_ts, to_ts))

    response = client.create_export_task(
            logGroupName=log_group_name,
            fromTime=from_ts * 1000,
            to=to_ts * 1000,
            destination=s3_bucket_name,
            destinationPrefix=s3_prefix
    )
    return response
