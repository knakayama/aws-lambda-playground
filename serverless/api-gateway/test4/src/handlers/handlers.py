from __future__ import print_function


def generate_policy(principal_id, effect, resource):
    return {'principalId': principal_id,
            'policyDocument': {
                'Version': '2012-10-17',
                'Statement': [{
                    'Action': 'execute-api:Invoke',
                    'Effect': effect,
                    'Resource': resource}]}}


def authorizerFunc(event, context):
    print(event)
    token = event['authorizationToken']

    if token == 'allow':
        return generate_policy('user', 'allow', event['methodArn'])
    elif token == 'deny':
        return generate_policy('user', 'deny', event['methodArn'])
    elif token == 'unauthorized':
        return 'Unauthorized'
    else:
        return 'Error'
