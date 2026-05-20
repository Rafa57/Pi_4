from .models import Doador
from rest_framework import serializers

class DoadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doador
        extra_kargs = {
            'valor': {'write_only': True}
        }
        fields = ('id', 'name', 'idade', 'email', 'valor')
        # fields = '__all__' # expõe todos os campos da classe Doador para a classe meta