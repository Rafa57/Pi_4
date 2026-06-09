from rest_framework import serializers
from .models import Doacao
from doadores.serializers import DoadorSerializer
from acoes.serializers import AcaoSerializer

class DoacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doacao
        fields = '__all__'
        read_only_fields = ['data']