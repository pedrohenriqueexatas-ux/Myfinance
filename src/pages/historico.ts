import { inicializarPagina } from './common';
import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { inicializarFiltros, obterValoresFiltros } from '../components/Filtros';
import { renderizarListaTransacoes } from '../components/ListaTransacoes';

inicializarPagina();

document.addEventListener('DOMContentLoaded', () => {
  const gerenciador = new GerenciadorFinanceiro();
  
  const atualizarTela = () => {
    const filtros = obterValoresFiltros();
    const transacoesFiltradas = gerenciador.filtrarTransacoes(
      filtros.categoria,
      filtros.tipo,
      filtros.mes,
      filtros.termo
    );
    renderizarListaTransacoes(transacoesFiltradas, gerenciador, atualizarTela);
  };
  
  inicializarFiltros(gerenciador, atualizarTela);
  atualizarTela();
});
