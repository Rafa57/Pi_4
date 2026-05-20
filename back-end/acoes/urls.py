from django.urls import path

from . import views

urlpatterns = [
    path("", views.acoes, name="acoes"),
]
