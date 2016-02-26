import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

'''
http://dev.classmethod.jp/cloud/aws/ami-and-snapshot-delete/
'''


def lambda_handler(event, context):
    try:
        client = boto3.client('ec2')
        imageID = event['detail']['requestParameters']['imageId']
        logger.info('Image ID: ' + imageID)

        response = client.describe_snapshots(
            Filters=[
                {
                    'Name': 'description',
                    'Values': [
                        'Created by CreateImage(*) for ' + imageID + ' from *',
                    ]
                }
            ]
        )

        for snapshot in response['Snapshots']:
            client.delete_snapshot(
                SnapshotId=snapshot['SnapshotId']
                )

            logger.info('Delete snapshot:' + snapshot['SnapshotId'] + ", Description:" + snapshot['Description'])

    except Exception as e:
        logger.info(e)
        raise e
