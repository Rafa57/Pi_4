from .models import Doador
from rest_framework import serializers
from doacoes.serializers import DoacaoSerializer

class DoadorSerializer(serializers.ModelSerializer):
    doacoes = DoacaoSerializer(many=True, read_only=True)
    valor_total = serializers.ReadOnlyField()
    class Meta:
        model = Doador
        fields = ['id', 'name', 'idade', 'email', 'valor_total', 'doacoes'] # expõe todos os campos da classe Doador para a classe meta
        # fields = ('id', 'name', 'idade', 'email', 'valor')