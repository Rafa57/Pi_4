from django.db import models
from django.db.models import Sum
from nanoid import generate
# from rest_framework import serializers

# Create your models here.
def gerar_nanoid():
    caracteres = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ'
    return generate(alphabet=caracteres, size=8)

class Doador(models.Model):
    id = models.CharField(primary_key=True, default=gerar_nanoid,max_length=8, editable=False)
    name = models.CharField(max_length=100, default="Não informado")
    idade = models.IntegerField(null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)

    @property
    def valor_total(self):
        total = self.doacoes.aggregate(Sum('valor'))['valor__sum']
        return float(total) if total is not None else 0.0

    def __str__(self):
        return self.name