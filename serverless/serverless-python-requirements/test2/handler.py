import requirements
from PIL import Image
import urllib2


def hello(event, context):
    url = 'http://3.bp.blogspot.com/-fQOCSaHHl_8/U7O61b5i-uI/AAAAAAAAiTo/3AOyCEbtMIA/s800/tatemono_hakubutsukan.png'
    image_path = '/tmp/test.png'

    with open(image_path, 'w') as f:
        f.write(urllib2.urlopen(url).read())

    return Image.open(image_path).filename
