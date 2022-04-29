from django_filters import rest_framework as filters

from users.models import User


def get_users():
    return User.objects.all()


def get_user(pk):
    return User.objects.get(pk=pk)


class UserFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = ('group',)
