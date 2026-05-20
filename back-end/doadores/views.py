from django.shortcuts import render
from rest_framework import viewsets
from doadores.serializers import DoadorSerializer
from doadores.models import Doador

# Create your views here.

class DoadorViewSet(viewsets.ModelViewSet):
    queryset = Doador.objects.all()
    serializer_class = DoadorSerializer