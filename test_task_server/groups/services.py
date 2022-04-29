from django_filters import rest_framework as filters

from groups.models import Group


def get_groups():
    return Group.objects.all()


class GroupFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    description = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Group
        fields = ('name', 'description')
