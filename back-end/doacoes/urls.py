from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoacaoViewSet

router = DefaultRouter()
router.register(r'', DoacaoViewSet, basename='doacoes')

urlpatterns = [
    path('', include(router.urls)),
]