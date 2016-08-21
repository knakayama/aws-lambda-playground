from __future__ import print_function
import re
import requests

CHECK_URL = 'https://ifconfig.co/'


def handle(event, context):
    lambda_ip = re.findall('(?:\d+\.){3}\d+', requests.get(CHECK_URL, verify=False).content)[0]
    print(lambda_ip)
    return {"lambda_ip": lambda_ip}
