from datetime import datetime
import boto3

FAILURE = 1
SUCCESS = 0
cw = boto3.client('cloudwatch')


def handler(event, context):
    metric_data = [{'MetricName': 'CloudFrontHealthCheck', 'Dimensions': [{'Name': 'CFDistributionName', 'Value': 'HealthCheck'}], 'Timestamp': datetime.utcnow(), 'Value': float(FAILURE), 'Unit': 'Count'}]
    cw.put_metric_data(Namespace='Test/CF', MetricData=metric_data)
