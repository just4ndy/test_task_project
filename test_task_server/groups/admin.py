from django.contrib import admin

# Register your models here.
from groups.models import Group


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('name',)
    list_display_links = ('id', 'name')
