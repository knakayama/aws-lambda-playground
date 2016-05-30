import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handle(event, context):
    logger.info(event)
    logger.info(context)
