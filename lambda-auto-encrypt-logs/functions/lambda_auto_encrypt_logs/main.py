from __future__ import print_function

import boto3
import urllib

S3 = boto3.client("s3")


def handle(event, context):
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = urllib.unquote_plus(event["Records"][0]["s3"]["object"]["key"]).decode("utf8")

    try:
        response = S3.put_object(
                Bucket=bucket,
                Key=key,
                ServerSideEncryption="AES256"
                )
        print(response)
    except Exception as e:
        print(e)
        raise e
