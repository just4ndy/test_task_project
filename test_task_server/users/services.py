from django_filters import rest_framework as filters

from users.models import User


def get_users():
    return User.objects.all()


def get_user(pk):
    return User.objects.get(pk=pk)


def update_user(pk, username, group_id):
    updated = False
    error = ''
    try:
        user = get_user(pk)
        user.username = username
        user.group_id = group_id
        user.save()
        updated = True
    except Exception as _ex:
        error = _ex
    return updated, error


def create_user(username, group_id):
    created = False
    error = ''
    try:
        User.objects.create(username=username, group_id=group_id)
        created = True
    except Exception as _ex:
        error = _ex
    return created, error


class UserFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = ('group',)
