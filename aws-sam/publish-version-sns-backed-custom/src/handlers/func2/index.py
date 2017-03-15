from __future__ import print_function
import cfnresponse
import boto3
import json

client = boto3.client('lambda')


def handler(event, context):
    if event['RequestType'] == 'Delete':
        cfnresponse.send(event, context, cfnresponse.SUCCESS, {})
    function_name = event['ResourceProperties']['FunctionName']
    try:
        code_sha256 = client.get_function(FunctionName=function_name)['Configuration']['CodeSha256']
    except Exception as e:
        print(e)
        cfnresponse.send(event, context, cfnresponse.FAILED, {})
    else:
        try:
            resp = client.publish_version(
                    FunctionName=function_name,
                    CodeSha256=code_sha256)
        except Exception as e:
            print(e)
            cfnresponse.send(event, context, cfnresponse.FAILED, {})
        else:
            response_data = {'Response': json.dumps(resp)}
            cfnresponse.send(event, context, cfnresponse.SUCCESS, response_data)
