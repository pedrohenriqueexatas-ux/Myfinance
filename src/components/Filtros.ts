// ============================================================
// Arquivo: Filtros.ts
// Descrição: Componente de filtros e pesquisa
// Permite filtrar transações por categoria, tipo, mês e texto
// ============================================================

import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { obterTodasCategorias } from '../utils/categorias';
import { formatarMes } from '../utils/formatadores';

// Função que inicializa os filtros
// Adiciona os eventos nos selects e no campo de pesquisa
export function inicializarFiltros(
  gerenciador: GerenciadorFinanceiro,
  atualizarListaFiltrada: () => void
): void {
  // Seleciona os elementos dos filtros
  const filtroCat = document.getElementById('filtro-categoria') as HTMLSelectElement;
  const filtroTipo = document.getElementById('filtro-tipo') as HTMLSelectElement;
  const filtroMes = document.getElementById('filtro-mes') as HTMLSelectElement;
  const campoPesquisa = document.getElementById('campo-pesquisa') as HTMLInputElement;

  // Adiciona evento de mudança em cada filtro
  if (filtroCat) {
    filtroCat.addEventListener('change', atualizarListaFiltrada);
  }

  if (filtroTipo) {
    filtroTipo.addEventListener('change', atualizarListaFiltrada);
  }

  if (filtroMes) {
    filtroMes.addEventListener('change', atualizarListaFiltrada);
  }

  // O campo de pesquisa atualiza enquanto o usuário digita
  if (campoPesquisa) {
    campoPesquisa.addEventListener('input', atualizarListaFiltrada);
  }

  // Preenche as opções dos filtros
  atualizarOpcoesFiltros(gerenciador);
}

// Preenche as opções dos selects de filtro
export function atualizarOpcoesFiltros(
  gerenciador: GerenciadorFinanceiro
): void {
  // Atualiza categorias
  atualizarFiltroCategorias(gerenciador);

  // Atualiza meses
  atualizarFiltroMeses(gerenciador);
}

// Preenche o select de categorias
function atualizarFiltroCategorias(
  _gerenciador: GerenciadorFinanceiro
): void {
  const select = document.getElementById('filtro-categoria') as HTMLSelectElement;

  if (!select) return;

  // Salva o valor atual para restaurar depois
  const valorAtual = select.value;

  // Limpa as opções
  select.innerHTML = '<option value="todas">Todas as Categorias</option>';

  // Pega todas as categorias
  const categorias = obterTodasCategorias();

  // Cria uma opção para cada categoria
  for (const categoria of categorias) {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    select.appendChild(option);
  }

  // Restaura o valor selecionado
  select.value = valorAtual || 'todas';
}

// Preenche o select de meses
function atualizarFiltroMeses(
  gerenciador: GerenciadorFinanceiro
): void {
  const select = document.getElementById('filtro-mes') as HTMLSelectElement;

  if (!select) return;

  // Salva o valor atual
  const valorAtual = select.value;

  // Limpa as opções
  select.innerHTML = '<option value="todos">Todos os Meses</option>';

  // Pega os meses disponíveis (que têm transações)
  const meses = gerenciador.obterMesesDisponiveis();

  // Cria uma opção para cada mês
  for (const mes of meses) {
    const option = document.createElement('option');
    option.value = mes;
    option.textContent = formatarMes(mes);
    select.appendChild(option);
  }

  // Restaura o valor selecionado
  select.value = valorAtual || 'todos';
}

// Retorna os valores atuais dos filtros
export function obterValoresFiltros(): {
  categoria: string;
  tipo: string;
  mes: string;
  termo: string;
} {
  const categoria = (
    document.getElementById('filtro-categoria') as HTMLSelectElement
  )?.value || 'todas';
  const tipo = (
    document.getElementById('filtro-tipo') as HTMLSelectElement
  )?.value || 'todos';
  const mes = (
    document.getElementById('filtro-mes') as HTMLSelectElement
  )?.value || 'todos';
  const termo = (
    document.getElementById('campo-pesquisa') as HTMLInputElement
  )?.value || '';

  return { categoria, tipo, mes, termo };
}
