import { inicializarPagina } from './common';
import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { atualizarDashboard } from '../components/Dashboard';

inicializarPagina();

document.addEventListener('DOMContentLoaded', () => {
  const gerenciador = new GerenciadorFinanceiro();
  atualizarDashboard(gerenciador);
});
