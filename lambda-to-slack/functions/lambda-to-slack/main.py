'''
I borrow This code from AWS Lambda Blueprint
'''

from __future__ import print_function

import boto3
import json
import logging

from base64 import b64decode
from urllib2 import Request, urlopen, URLError, HTTPError


ENCRYPTED_HOOK_URL = 'CiCA11wLAJqYMrIisE/qvX6zhCfpa0rrKbzY1ikSd17iARLQAQEBAgB4gNdcCwCamDKyIrBP6r1+s4Qn6WtK6ym82NYpEnde4gEAAACnMIGkBgkqhkiG9w0BBwaggZYwgZMCAQAwgY0GCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMhaebPO0fP0lnYPK/AgEQgGCIo8obrRu1ts1/I1Z/4e9lBTL6HDKN20XwM5tLDuY6mR3s828gF/vM9hqDIoNpLUdAM/9HBlTX+5Op1MS5So+ITX0/9rMVRAEYmt7WQO/j3Jclrh5wzRdi4X8zDFoyXj4='
SLACK_CHANNEL = 'aws'

HOOK_URL = "https://" + boto3.client('kms').decrypt(CiphertextBlob=b64decode(ENCRYPTED_HOOK_URL))['Plaintext']

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handle(event, context):
    logger.info("Event: " + str(event))
    message = json.loads(event['Records'][0]['Sns']['Message'])
    logger.info("Message: " + str(message))

    alarm_name = message['AlarmName']
    #old_state = message['OldStateValue']
    new_state = message['NewStateValue']
    reason = message['NewStateReason']

    slack_message = {
        'channel': SLACK_CHANNEL,
        'text': "%s state is now %s: %s" % (alarm_name, new_state, reason)
    }

    req = Request(HOOK_URL, json.dumps(slack_message))
    try:
        response = urlopen(req)
        response.read()
        logger.info("Message posted to %s", slack_message['channel'])
    except HTTPError as e:
        logger.error("Request failed: %d %s", e.code, e.reason)
    except URLError as e:
        logger.error("Server connection failed: %s", e.reason)
