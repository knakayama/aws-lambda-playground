from user2 import UserModel2


def main():
    UserModel2(last_name='Smith', first_name='Coper', email='test@example.com').save()
    UserModel2(last_name='Smith', first_name='Adam', email='test@example.com').save()

    print(UserModel2.count('Smith'))
    print(UserModel2.count('Smith', UserModel2.first_name.startswith('B')))

    for item in UserModel2.query('Smith', UserModel2.first_name.startswith('A')):
        print(item.attribute_values)

    for item in UserModel2.query('Smith',
                                 UserModel2.first_name.startswith('X') | UserModel2.email.contains('example.com')):
        print(item.attribute_values)


if __name__ == '__main__':
    main()
