from .models import Acao
from rest_framework import serializers

class AcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acao
        fields = '__all__'