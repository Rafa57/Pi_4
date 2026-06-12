from django.shortcuts import render
from rest_framework import viewsets
from django.db.models import Sum
from .models import Doacao
from .serializers import DoacaoSerializer

# Create your views here.
class DoacaoViewSet(viewsets.ModelViewSet):
    serializer_class = DoacaoSerializer

    def get_queryset(self):
        queryset = Doacao.objects.all()

        doador_id = self.request.query_params.get('doador')
        acao_id = self.request.query_params.get('acao')

        if doador_id is not None:
            queryset = queryset.filter(doador_id=doador_id)

        if acao_id and acao_id != '':
            queryset = queryset.filter(acao_id=acao_id)

        return queryset.order_by('-data')