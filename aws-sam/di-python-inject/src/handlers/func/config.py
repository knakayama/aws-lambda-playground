import boto3


def cloud(binder):
    binder.bind(boto3.resource('dynamodb'), boto3.resource('dynamodb'))


def localhost(binder):
    binder.bind(boto3.resource('dynamodb'), boto3.resource('dynamodb', endpoint_url='http://localhost:4569'))
