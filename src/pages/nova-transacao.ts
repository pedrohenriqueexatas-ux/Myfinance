import { inicializarPagina } from './common';
import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { inicializarFormulario } from '../components/Formulario';

inicializarPagina();

document.addEventListener('DOMContentLoaded', function() {
  const gerenciador = new GerenciadorFinanceiro();
  inicializarFormulario(gerenciador, function() {});

  const form = document.getElementById('form-transacao');
  if (form !== null) {
    form.addEventListener('submit', function() {
      setTimeout(function() {
        window.location.href = 'historico.html';
      }, 1500);
    });
  }
});
