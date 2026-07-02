// ============================================================
// Arquivo: Resumo.ts
// Descrição: Componente do resumo financeiro
// Mostra um resumo detalhado das finanças
// ============================================================

import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { formatarMoeda } from '../utils/formatadores';

// Função que atualiza o resumo financeiro
export function atualizarResumo(gerenciador: GerenciadorFinanceiro): void {
  const totalReceitas = gerenciador.calcularTotalReceitas();
  const totalDespesas = gerenciador.calcularTotalDespesas();
  const saldo = gerenciador.calcularSaldo();
  const quantidade = gerenciador.obterQuantidade();
  const transacoes = gerenciador.obterTransacoes();

  // Atualiza os valores do resumo
  atualizarTexto('resumo-receitas', formatarMoeda(totalReceitas));
  atualizarTexto('resumo-despesas', formatarMoeda(totalDespesas));
  atualizarTexto('resumo-saldo', formatarMoeda(saldo));
  atualizarTexto('resumo-quantidade', quantidade.toString());

  // Calcula a porcentagem de gastos em relação às receitas
  let porcentagemGastos = 0;
  if (totalReceitas > 0) {
    porcentagemGastos = (totalDespesas / totalReceitas) * 100;
  }
  atualizarTexto('resumo-porcentagem', porcentagemGastos.toFixed(1) + '%');

  // Atualiza a barra de progresso
  atualizarBarraProgresso(porcentagemGastos);

  // Atualiza o status financeiro
  atualizarStatusFinanceiro(saldo, porcentagemGastos);

  // Gera o resumo por categoria
  gerarResumoPorCategoria(transacoes, gerenciador);
}

// Atualiza o texto de um elemento
function atualizarTexto(id: string, valor: string): void {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.textContent = valor;
  }
}

// Atualiza a barra de progresso de gastos
function atualizarBarraProgresso(porcentagem: number): void {
  const barra = document.getElementById('barra-gastos') as HTMLElement;

  if (barra) {
    // Limita a porcentagem a no máximo 100%
    const largura = Math.min(porcentagem, 100);
    barra.style.width = largura + '%';

    // Muda a cor de acordo com o nível de gastos
    if (porcentagem <= 50) {
      barra.style.backgroundColor = '#27ae60'; // Verde
    } else if (porcentagem <= 75) {
      barra.style.backgroundColor = '#f39c12'; // Amarelo
    } else {
      barra.style.backgroundColor = '#EF233C'; // Vermelho
    }
  }
}

// Mostra uma mensagem de status financeiro
function atualizarStatusFinanceiro(
  saldo: number,
  porcentagemGastos: number
): void {
  const statusEl = document.getElementById('status-financeiro');

  if (!statusEl) return;

  let mensagem = '';
  let classe = '';

  // Usa condicionais para determinar o status
  if (saldo > 0 && porcentagemGastos <= 50) {
    mensagem = '🟢 Suas finanças estão ótimas! Continue assim.';
    classe = 'status-otimo';
  } else if (saldo > 0 && porcentagemGastos <= 75) {
    mensagem = '🟡 Atenção! Seus gastos estão moderados.';
    classe = 'status-atencao';
  } else if (saldo > 0) {
    mensagem = '🟠 Cuidado! Seus gastos estão altos.';
    classe = 'status-cuidado';
  } else if (saldo === 0) {
    mensagem = '⚪ Seu saldo está zerado. Comece a registrar.';
    classe = 'status-neutro';
  } else {
    mensagem = '🔴 Alerta! Você está no vermelho.';
    classe = 'status-negativo';
  }

  statusEl.textContent = mensagem;
  statusEl.className = 'status-financeiro ' + classe;
}

// Gera o resumo de gastos por categoria
function gerarResumoPorCategoria(
  transacoes: import('../models/Transacao').Transacao[],
  _gerenciador: GerenciadorFinanceiro
): void {
  const container = document.getElementById('resumo-categorias');

  if (!container) return;

  // Limpa o container
  container.innerHTML = '';

  // Cria um objeto para acumular os valores por categoria
  // Usamos um array de objetos simples em vez de Map
  const categorias: { nome: string; receitas: number; despesas: number }[] = [];

  // Percorre todas as transações e acumula por categoria
  for (const transacao of transacoes) {
    // Procura se a categoria já existe no array
    let categoriaExistente = categorias.find(
      (c) => c.nome === transacao.categoria
    );

    // Se não existe, cria uma nova entrada
    if (!categoriaExistente) {
      categoriaExistente = { nome: transacao.categoria, receitas: 0, despesas: 0 };
      categorias.push(categoriaExistente);
    }

    // Acumula o valor na categoria correta
    if (transacao.tipo === 'receita') {
      categoriaExistente.receitas += transacao.valor;
    } else {
      categoriaExistente.despesas += transacao.valor;
    }
  }

  // Se não há categorias, mostra mensagem
  if (categorias.length === 0) {
    container.innerHTML = '<p class="texto-vazio">Nenhuma transação registrada.</p>';
    return;
  }

  // Cria um card para cada categoria
  for (const categoria of categorias) {
    const saldoCategoria = categoria.receitas - categoria.despesas;

    const card = document.createElement('div');
    card.className = 'categoria-card';

    card.innerHTML = `
      <h4 class="categoria-titulo">${categoria.nome}</h4>
      <div class="categoria-detalhes">
        <div class="categoria-item">
          <span class="categoria-label">Receitas</span>
          <span class="categoria-valor valor-receita">${formatarMoeda(categoria.receitas)}</span>
        </div>
        <div class="categoria-item">
          <span class="categoria-label">Despesas</span>
          <span class="categoria-valor valor-despesa">${formatarMoeda(categoria.despesas)}</span>
        </div>
        <div class="categoria-item categoria-saldo">
          <span class="categoria-label">Saldo</span>
          <span class="categoria-valor ${saldoCategoria >= 0 ? 'valor-receita' : 'valor-despesa'}">
            ${formatarMoeda(saldoCategoria)}
          </span>
        </div>
      </div>
    `;

    container.appendChild(card);
  }
}
