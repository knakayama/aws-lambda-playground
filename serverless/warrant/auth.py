import os
from warrant import Cognito


def handler(event, context):
    print(event)
    cognito_pool_id = os.environ['COGNITO_POOL_ID']
    cognito_client_id = os.environ['COGNITO_CLIENT_ID']
    username = event['username']
    password = event['password']

    cognito = Cognito(
        cognito_pool_id,
        cognito_client_id,
        user_pool_region=os.environ['AWS_REGION'],
        username=username)

    try:
        cognito.authenticate(password=password)
    except Exception as e:
        print(e)
        raise Exception
    else:
        return cognito.id_token
