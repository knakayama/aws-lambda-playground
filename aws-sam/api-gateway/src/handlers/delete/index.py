from __future__ import print_function
import json
import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'vendored'))
import pymysql


def response(body):
    resp = {}
    resp['statusCode'] = 200
    resp['body'] = json.dumps(body)

    return resp


def delete(event, context):
    body = {}
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
                    'DELETE FROM `users` WHERE `id` = %s',
                    (int(event['id'])))
        conn.commit()
    finally:
        conn.close()
        return response(body)
