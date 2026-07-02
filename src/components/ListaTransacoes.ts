// ============================================================
// Arquivo: ListaTransacoes.ts
// Descrição: Componente que renderiza a lista de transações no histórico
// ============================================================

import { Transacao } from '../models/Transacao';
import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { formatarMoeda, formatarData } from '../utils/formatadores';
import { mostrarMensagem } from './Formulario';

export function renderizarListaTransacoes(
  transacoes: Transacao[],
  gerenciador: GerenciadorFinanceiro,
  atualizarTela: () => void
): void {
  const corpoTabela = document.getElementById('corpo-tabela');
  if (!corpoTabela) return;
  corpoTabela.innerHTML = '';

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

  for (const transacao of transacoes) {
    const linha = criarLinhaTransacao(transacao);
    corpoTabela.appendChild(linha);
  }

  adicionarEventosBotoes(gerenciador, atualizarTela);
}

function criarLinhaTransacao(transacao: Transacao): HTMLTableRowElement {
  const linha = document.createElement('tr');

  if (transacao.tipo === 'receita') {
    linha.classList.add('linha-receita');
  } else {
    linha.classList.add('linha-despesa');
  }

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

function adicionarEventosBotoes(
  gerenciador: GerenciadorFinanceiro,
  atualizarTela: () => void
): void {
  const botoesEditar = document.querySelectorAll('.btn-editar');
  for (const botao of botoesEditar) {
    botao.addEventListener('click', () => {
      const id = (botao as HTMLElement).getAttribute('data-id');
      if (id) {
        // MPA: Redireciona para a página de formulário com o ID na URL
        window.location.href = `nova-transacao.html?id=${id}`;
      }
    });
  }

  const botoesExcluir = document.querySelectorAll('.btn-excluir');
  for (const botao of botoesExcluir) {
    botao.addEventListener('click', () => {
      const id = (botao as HTMLElement).getAttribute('data-id');
      if (id) {
        const confirmou = confirm('Tem certeza que deseja excluir esta transação?');
        if (confirmou) {
          const removeu = gerenciador.removerTransacao(id);
          if (removeu) {
            mostrarMensagem('Transação excluída com sucesso!', 'sucesso');
          } else {
            mostrarMensagem('Erro ao excluir a transação.', 'erro');
          }
          atualizarTela();
        }
      }
    });
  }
}
