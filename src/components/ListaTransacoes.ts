// ============================================================
// Arquivo: ListaTransacoes.ts
// Descrição: Componente que renderiza a lista de transações no histórico
// Mostra as transações em uma tabela com botões de editar e excluir
// ============================================================

import { Transacao } from '../models/Transacao';
import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { formatarMoeda, formatarData } from '../utils/formatadores';
import { preencherFormularioParaEdicao, mostrarMensagem } from './Formulario';

// Função que renderiza a lista de transações
// Recebe o array de transações a serem exibidas e o gerenciador
export function renderizarListaTransacoes(
  transacoes: Transacao[],
  gerenciador: GerenciadorFinanceiro,
  atualizarTela: () => void
): void {
  // Busca o corpo da tabela onde as linhas serão inseridas
  const corpoTabela = document.getElementById('corpo-tabela');

  // Se não encontrou o elemento, sai da função
  if (!corpoTabela) return;

  // Limpa a tabela antes de renderizar
  corpoTabela.innerHTML = '';

  // Se não há transações, mostra uma mensagem
  if (transacoes.length === 0) {
    const linhaVazia = document.createElement('tr');
    linhaVazia.innerHTML = `
      <td colspan="6" class="tabela-vazia">
        Nenhuma transação encontrada.
      </td>
    `;
    corpoTabela.appendChild(linhaVazia);
    return;
  }

  // Percorre as transações e cria uma linha para cada uma
  for (const transacao of transacoes) {
    // Cria a linha da tabela
    const linha = criarLinhaTransacao(transacao);

    // Adiciona a linha no corpo da tabela
    corpoTabela.appendChild(linha);
  }

  // Adiciona os eventos nos botões de editar e excluir
  adicionarEventosBotoes(gerenciador, atualizarTela);
}

// Cria uma linha (<tr>) para uma transação
function criarLinhaTransacao(transacao: Transacao): HTMLTableRowElement {
  const linha = document.createElement('tr');

  // Define a classe de acordo com o tipo (receita = verde, despesa = vermelho)
  if (transacao.tipo === 'receita') {
    linha.classList.add('linha-receita');
  } else {
    linha.classList.add('linha-despesa');
  }

  // Monta o HTML da linha com os dados da transação
  linha.innerHTML = `
    <td data-label="Data">${formatarData(transacao.data)}</td>
    <td data-label="Descrição">${transacao.descricao}</td>
    <td data-label="Categoria">
      <span class="badge-categoria">${transacao.categoria}</span>
    </td>
    <td data-label="Tipo">
      <span class="badge-tipo badge-${transacao.tipo}">
        ${transacao.tipo === 'receita' ? '↑ Receita' : '↓ Despesa'}
      </span>
    </td>
    <td data-label="Valor" class="valor-${transacao.tipo}">
      ${transacao.tipo === 'receita' ? '+' : '-'} ${formatarMoeda(transacao.valor)}
    </td>
    <td data-label="Ações" class="coluna-acoes">
      <button class="btn-editar" data-id="${transacao.id}" title="Editar">
        ✏️
      </button>
      <button class="btn-excluir" data-id="${transacao.id}" title="Excluir">
        🗑️
      </button>
    </td>
  `;

  return linha;
}

// Adiciona os eventos de clique nos botões de editar e excluir
function adicionarEventosBotoes(
  gerenciador: GerenciadorFinanceiro,
  atualizarTela: () => void
): void {
  // Seleciona todos os botões de editar
  const botoesEditar = document.querySelectorAll('.btn-editar');

  // Adiciona evento de clique em cada botão de editar
  for (const botao of botoesEditar) {
    botao.addEventListener('click', () => {
      // Pega o id da transação do atributo data-id
      const id = (botao as HTMLElement).getAttribute('data-id');

      if (id) {
        // Preenche o formulário com os dados da transação
        preencherFormularioParaEdicao(id, gerenciador);
      }
    });
  }

  // Seleciona todos os botões de excluir
  const botoesExcluir = document.querySelectorAll('.btn-excluir');

  // Adiciona evento de clique em cada botão de excluir
  for (const botao of botoesExcluir) {
    botao.addEventListener('click', () => {
      const id = (botao as HTMLElement).getAttribute('data-id');

      if (id) {
        // Confirma com o usuário antes de excluir
        const confirmou = confirm('Tem certeza que deseja excluir esta transação?');

        if (confirmou) {
          // Remove a transação
          const removeu = gerenciador.removerTransacao(id);

          if (removeu) {
            mostrarMensagem('Transação excluída com sucesso!', 'sucesso');
          } else {
            mostrarMensagem('Erro ao excluir a transação.', 'erro');
          }

          // Atualiza a tela
          atualizarTela();
        }
      }
    });
  }
}
