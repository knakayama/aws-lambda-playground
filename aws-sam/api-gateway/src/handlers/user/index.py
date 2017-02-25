from __future__ import print_function
import json
import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'vendored'))
import pymysql


def response(result):
    resp = {}
    resp['statusCode'] = 200
    resp['body'] = json.dumps(result)

    return resp


def user(event, context):
    print(event)
    conn = pymysql.connect(
            host=os.environ['RDSEndpointAddress'],
            user=os.environ['RDSUser'],
            password=os.environ['RDSPassword'],
            db=os.environ['RDSDB'],
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor)
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                    'SELECT * FROM `users` WHERE `id` = %s',
                    (int(event['id'])))
            result = cursor.fetchone()
            print(result)
    finally:
        conn.close()
        return response(result)
