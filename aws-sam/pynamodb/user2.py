from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute


class UserModel2(Model):
    """
    A DynamoDB User
    """
    class Meta:
        table_name: str = 'dynamodb-user2'
        host: str = 'http://localhost:4569'
        region: str = 'ap-northeast-1'
    last_name: UnicodeAttribute = UnicodeAttribute(hash_key=True)
    first_name: UnicodeAttribute = UnicodeAttribute(range_key=True)
    email: UnicodeAttribute = UnicodeAttribute()


def main():
    UserModel2.create_table(read_capacity_units=1, write_capacity_units=1)


if __name__ == '__main__':
    main()
