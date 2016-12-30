import random
def lambda_handler(event, context):
    return {"foo":random.choice([0,1,2])}
