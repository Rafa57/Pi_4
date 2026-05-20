from django.urls import path, include

from rest_framework.routers import DefaultRouter
from doadores.views import DoadorViewSet

router = DefaultRouter()
router.register(r'', DoadorViewSet)

urlpatterns = [
    path('', include(router.urls))
]