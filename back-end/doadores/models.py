from django.db import models
from nanoid import generate
from rest_framework import serializers

# Create your models here.
def gerar_nanoid():
    caracteres = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ'
    return generate(alphabet=caracteres, size=8)

class Doador(models.Model):
    id = models.CharField(
        primary_key=True,
        default=gerar_nanoid,
        max_length=8,
        editable=False
    )
    name = models.CharField(
        max_length=100,
        default="Não informado"
    )
    idade = models.IntegerField(
        default="Não informado"
    )
    email = models.EmailField(
        max_length=100,
        default="Não informado"
    )
    valor = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.name