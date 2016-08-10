import os
import boto3
import logging

SPOT_FLEET_REQUEST_ID = os.environ['SpotFleetRequestId']

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    client = boto3.client('ec2')
    resp = client.modify_spot_fleet_request(
            SpotFleetRequestId=SPOT_FLEET_REQUEST_ID,
            TargetCapacity=3
            )
    logger.info(resp)
