from user1 import UserModel1


def main():
    user: UserModel1 = UserModel1('test@example.com', first_name='Samuel', last_name='Adams')
    user.save()
    print(UserModel1.count())
    print(user.email)
    user.email = 'test2@example.com'
    user.save()
    print(user.email)
    user.refresh()
    print(user.attribute_values)
    user.delete()


if __name__ == '__main__':
    main()
