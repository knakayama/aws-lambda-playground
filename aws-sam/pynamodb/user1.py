from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute


class UserModel1(Model):
    """
    A DynamoDB User
    """
    class Meta:
        table_name: str = 'dynamodb-user1'
        host: str = 'http://localhost:4569'
        region: str = 'ap-northeast-1'
    email: UnicodeAttribute = UnicodeAttribute(hash_key=True)
    first_name: UnicodeAttribute = UnicodeAttribute()
    last_name: UnicodeAttribute = UnicodeAttribute()


def main() -> None:
    UserModel1.create_table(read_capacity_units=1, write_capacity_units=1)


if __name__ == '__main__':
    main()
