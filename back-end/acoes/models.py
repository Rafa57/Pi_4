from django.db import models
from django.db.models import Sum

# Create your models here.

class Acao(models.Model):
    name = models.CharField(blank=False, null=False, max_length=100)
    local = models.CharField(null=False, max_length=100)
    data = models.DateTimeField(null=False, blank=False)
    imagem = models.ImageField(upload_to={'acoes_fotos/'}, null=True, blank=True)
    descricao = models.CharField(max_length=200, blank=True, null=True)

    @property
    def total_arrecadado(self):
        total = self.doacoes_acao.aggregate(Sum('valor'))['valor__sum']
        return total if total is not None else 0.0
    
    def __str__(self):
        return self.name

# def __str__(self):
#     return f"Nome: {self.name} | Local: {self.local} | Valor esperado: {self.valor_esperado}"

# @classmethod
# def create_acao(cls, nome, local, valor_esperado):
#     acao = cls(
#         nome=nome,
#         local=local,
#         valor_esperado=valor_esperado
#     )
#     acao.save()
#     return acao