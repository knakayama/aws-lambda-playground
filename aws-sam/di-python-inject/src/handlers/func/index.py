import inject

from func1 import Func1
import config

inject.configure(config.cloud)


def handler(event, context):
    return Func1(event, context).main()
