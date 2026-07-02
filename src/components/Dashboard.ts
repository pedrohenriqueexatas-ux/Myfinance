// ============================================================
// Arquivo: Dashboard.ts
// Descrição: Componente do Dashboard
// Atualiza os cards com informações financeiras (saldo, receitas, despesas)
// ============================================================

import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { formatarMoeda } from '../utils/formatadores';

// Função que atualiza todos os cards do dashboard
// Recebe o gerenciador financeiro para acessar os dados
export function atualizarDashboard(gerenciador: GerenciadorFinanceiro): void {
  // Calcula os valores
  const saldo = gerenciador.calcularSaldo();
  const totalReceitas = gerenciador.calcularTotalReceitas();
  const totalDespesas = gerenciador.calcularTotalDespesas();
  const quantidade = gerenciador.obterQuantidade();

  // Atualiza o card do saldo
  atualizarCard('valor-saldo', formatarMoeda(saldo));

  // Adiciona classe para mudar a cor quando o saldo é negativo
  const cardSaldo = document.getElementById('card-saldo');
  if (cardSaldo) {
    if (saldo < 0) {
      cardSaldo.classList.add('card-negativo');
    } else {
      cardSaldo.classList.remove('card-negativo');
    }
  }

  // Atualiza o card de receitas
  atualizarCard('valor-receitas', formatarMoeda(totalReceitas));

  // Atualiza o card de despesas
  atualizarCard('valor-despesas', formatarMoeda(totalDespesas));

  // Atualiza o card de quantidade de lançamentos
  atualizarCard('valor-quantidade', quantidade.toString());
}

// Função auxiliar que atualiza o texto de um card pelo id
function atualizarCard(id: string, valor: string): void {
  // Busca o elemento pelo id
  const elemento = document.getElementById(id);

  // Se encontrou, atualiza o texto
  if (elemento) {
    elemento.textContent = valor;
  }
}
