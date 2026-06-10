from django.shortcuts import render
from rest_framework import viewsets
from acoes.serializers import AcaoSerializer
from acoes.models import Acao

# Create your views here.

class AcaoViewSet(viewsets.ModelViewSet):
    queryset = Acao.objects.all()
    serializer_class = AcaoSerializer
