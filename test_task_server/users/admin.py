from django.contrib import admin

# Register your models here.
from users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'created_at', 'group')
    list_display_links = ('id', 'username')
    search_fields = ('username',)
    list_editable = ('group',)