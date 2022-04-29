from django.db import models

# Create your models here.
from groups.models import Group


class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='users')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
