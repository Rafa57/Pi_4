from django.db import models

# Create your models here.

class Acao(models.Model):
    acao_id = models.AutoField(primary_key=True)
    name = models.CharField(
        blank=False,
        null=False,
        max_length=100
    )
    local = models.CharField(
        null=False,
        max_length=100
    )
    valor_esperado = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

def __str__(self):
    return f"Nome: {self.name} | Local: {self.local} | Valor esperado: {self.valor_esperado}"

@classmethod
def create_acao(cls, nome, local, valor_esperado):
    acao = cls(
        nome=nome,
        local=local,
        valor_esperado=valor_esperado
    )
    acao.save()
    return acao