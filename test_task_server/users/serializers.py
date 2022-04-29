from rest_framework import serializers

from groups.serializers import GroupSerializer
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = User
        fields = '__all__'


class LowUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'group')
