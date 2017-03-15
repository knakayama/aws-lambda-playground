from __future__ import print_function
import boto3

client = boto3.client('codepipeline')


def hello(event, context):
    print(event)
    job_id = event['CodePipeline.job']['id']
    client.put_job_success_result(jobId=job_id)
    return 'Complete.'
