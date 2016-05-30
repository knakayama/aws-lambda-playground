# coding: utf-8

import re
import logging
import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)

CHECK_URL = 'https://ifconfig.co/'


def handle(event, context):
    logger.info(re.findall('(?:\d+\.){3}\d+', requests.get(CHECK_URL, verify=False).content)[0])
