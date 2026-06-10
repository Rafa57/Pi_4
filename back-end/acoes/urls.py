from django.urls import path, include

from rest_framework.routers import DefaultRouter
from acoes.views import AcaoViewSet

router = DefaultRouter()
router.register(r'', AcaoViewSet)

urlpatterns = [
    path("", include(router.urls))
]