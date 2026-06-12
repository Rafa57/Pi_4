from django.db import models

from doadores.models import Doador
from acoes.models import Acao
# Create your models here.

class Doacao(models.Model):
    doador = models.ForeignKey(Doador, on_delete=models.CASCADE, related_name='doacoes')
    
    acao = models.ForeignKey(Acao, on_delete=models.CASCADE, related_name='doacoes_acao')

    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"R$ {self.valor} de {self.doador.name} para {self.acao.name}"