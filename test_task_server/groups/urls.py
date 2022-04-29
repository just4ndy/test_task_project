from rest_framework.routers import SimpleRouter

from groups.viewsets import GroupViewSet

router = SimpleRouter()

router.register('', GroupViewSet, basename='groups')

urlpatterns = router.urls
