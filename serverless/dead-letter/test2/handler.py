from __future__ import print_function


def fail(event, context):
    raise Exception('Exception occured')


def invoked(event, context):
    print('Invoked with the event: {}'.format(event))
