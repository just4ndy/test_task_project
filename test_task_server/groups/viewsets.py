# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from groups.serializers import GroupSerializer, AllGroupSerializer
from groups.services import get_groups, GroupFilter


class GroupViewSet(viewsets.ModelViewSet):
    queryset = get_groups()
    serializer_class = GroupSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = GroupFilter

    def list(self, request, *args, **kwargs):
        if len(request.query_params) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Filter must be set.'})
        else:
            return super().list(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        group = self.get_object()
        if len(group.users.all()) == 0:
            group.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Group has users.'})

    @action(detail=False, methods=['GET'], url_path='get-all-groups')
    def get_all_groups(self, request):
        groups = get_groups()
        serializer = AllGroupSerializer(groups, many=True)
        return Response(serializer.data)
