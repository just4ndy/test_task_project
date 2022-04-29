# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.response import Response

from users.serializers import UserSerializer
from users.services import get_users, UserFilter, get_user


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_users()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = UserFilter

    def list(self, request, *args, **kwargs):
        if len(request.query_params) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Filter must be set.'})
        else:
            return super().list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        user = get_user(request.data['id'])
        user.username = request.data['username']
        user.group_id = request.data['group']
        user.save()
        return Response(status=status.HTTP_200_OK)

