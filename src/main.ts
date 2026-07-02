// ============================================================
// Arquivo: main.ts
// Descrição: Arquivo principal do projeto MyFinance
// É o ponto de entrada da aplicação
// Aqui inicializamos todos os componentes e conectamos tudo
// ============================================================

// Importa o CSS
import './styles/main.css';

// Importa os componentes
import { inicializarNavbar } from './components/Navbar';
import { atualizarDashboard } from './components/Dashboard';
import { inicializarFormulario } from './components/Formulario';
import { renderizarListaTransacoes } from './components/ListaTransacoes';
import {
  inicializarFiltros,
  obterValoresFiltros,
  atualizarOpcoesFiltros,
} from './components/Filtros';
import { atualizarResumo } from './components/Resumo';

// Importa o gerenciador financeiro
import { GerenciadorFinanceiro } from './services/GerenciadorFinanceiro';

// ============================================================
// INICIALIZAÇÃO DO SISTEMA
// ============================================================

// Cria uma instância do gerenciador financeiro
// Ele carrega os dados do LocalStorage automaticamente
const gerenciador = new GerenciadorFinanceiro();

// Função principal que atualiza toda a tela
// É chamada sempre que algo muda (adicionar, editar, excluir)
function atualizarTela(): void {
  // Atualiza os cards do dashboard
  atualizarDashboard(gerenciador);

  // Atualiza as opções dos filtros
  atualizarOpcoesFiltros(gerenciador);

  // Atualiza a lista de transações com os filtros aplicados
  atualizarListaComFiltros();

  // Atualiza o resumo financeiro
  atualizarResumo(gerenciador);
}

// Função que atualiza a lista aplicando os filtros atuais
function atualizarListaComFiltros(): void {
  // Pega os valores atuais dos filtros
  const filtros = obterValoresFiltros();

  // Aplica os filtros nas transações
  const transacoesFiltradas = gerenciador.filtrarTransacoes(
    filtros.categoria,
    filtros.tipo,
    filtros.mes,
    filtros.termo
  );

  // Renderiza a lista com as transações filtradas
  renderizarListaTransacoes(transacoesFiltradas, gerenciador, atualizarTela);
}

// ============================================================
// QUANDO A PÁGINA CARREGAR
// ============================================================

// Espera o DOM (a página HTML) estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa a barra de navegação
  inicializarNavbar();

  // Inicializa o formulário de transações
  inicializarFormulario(gerenciador, atualizarTela);

  // Inicializa os filtros
  inicializarFiltros(gerenciador, atualizarListaComFiltros);

  // Atualiza a tela com os dados carregados
  atualizarTela();
});
