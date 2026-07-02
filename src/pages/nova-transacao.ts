import { inicializarPagina } from './common';
import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { inicializarFormulario } from '../components/Formulario';

inicializarPagina();

document.addEventListener('DOMContentLoaded', () => {
  const gerenciador = new GerenciadorFinanceiro();
  // Passa uma função vazia para atualizarTela já que mudamos a navegação
  inicializarFormulario(gerenciador, () => {});
  
  // Como estamos em MPA, quando salvar com sucesso redirecionamos pro historico
  const form = document.getElementById('form-transacao');
  if (form) {
    form.addEventListener('submit', () => {
      // Redireciona após pequeno delay para dar tempo de ver a mensagem de sucesso
      setTimeout(() => {
        window.location.href = 'historico.html';
      }, 1500);
    });
  }
});
