import base64


class Firehose(object):
    def __init__(self, event, context):
        self.event = event
        self.context = context

    def transform(self):
        output = []

        for record in self.event['records']:
            print(record['recordId'])
            payload = base64.b64decode(record['data'])

            output_record = {
                'recordId': record['recordId'],
                'result': 'Ok',
                'data': base64.b64encode(payload).decode('utf-8')
            }
            output.append(output_record)

        print('Successfully processed {} records.'.format(len(self.event['records'])))

        return {'records': output}


def handler(event, context):
    print(event)
    firehose = Firehose(event, context)
    return firehose.transform()
