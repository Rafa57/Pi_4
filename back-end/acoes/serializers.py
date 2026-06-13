from .models import Acao
from rest_framework import serializers
from doacoes.serializers import DoacaoSerializer

class AcaoSerializer(serializers.ModelSerializer):
    doacoes_acao = DoacaoSerializer(many=True, read_only=True)
    total_arrecadado = serializers.ReadOnlyField()

    class Meta:
        model = Acao
        fields = ['id', 'name', 'local', 'data', 'imagem', 'descricao', 'total_arrecadado', 'doacoes_acao']