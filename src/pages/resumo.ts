import { inicializarPagina } from './common';
import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { atualizarResumo } from '../components/Resumo';

inicializarPagina();

document.addEventListener('DOMContentLoaded', () => {
  const gerenciador = new GerenciadorFinanceiro();
  atualizarResumo(gerenciador);
});
