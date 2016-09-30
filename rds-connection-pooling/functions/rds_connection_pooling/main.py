from __future__ import print_function

import os
import pymysql.cursors

#RDS_ENDPOINT = os.environ["RDSEndpoint"]
#USER = os.environ["user"]
#PASS = os.environ["pass"]
#DB_NAME = os.environ["db_name"]
RDS_ENDPOINT = "rds-public-rds.cumbifw8m8os.ap-northeast-1.rds.amazonaws.com"
USER = "master_username"
PASS = "master_password"
DB_NAME = "rds"


def get_conn():
    conn = pymysql.connect(
            host=RDS_ENDPOINT,
            user=USER,
            password=PASS,
            db=DB_NAME,
            cursorclass=pymysql.cursors.DictCursor
            )


def handle(event, context):
    if pymysql.connections:
        print("YES")
    get_conn()
    #try:
    #    with conn.cursor() as cursor:
    #        cursor.execute(sql)
    #except Exception as e:
    #    print(e)
    #    return {"error": e.response["Error"]["Message"]}
    #finally:
    #    conn.close()
    #    print(cursor)
    #    return {"cursor": cursor}
