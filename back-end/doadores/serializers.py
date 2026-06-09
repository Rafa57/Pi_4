from .models import Doador
from rest_framework import serializers

class DoadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doador
        fields = '__all__' # expõe todos os campos da classe Doador para a classe meta
        # fields = ('id', 'name', 'idade', 'email', 'valor')