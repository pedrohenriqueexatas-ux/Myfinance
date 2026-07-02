// ============================================================
// Arquivo: GerenciadorFinanceiro.ts
// Descrição: Classe responsável por gerenciar todas as transações
// Ela armazena o array de transações e faz as operações
// (adicionar, remover, editar, filtrar, calcular)
// ============================================================

import { Transacao, ITransacao } from '../models/Transacao';
import { salvarNoStorage, carregarDoStorage } from './StorageService';

// Classe GerenciadorFinanceiro - o "cérebro" do sistema
// Ela cuida de todas as operações com as transações
export class GerenciadorFinanceiro {
  // Array que guarda todas as transações
  private transacoes: Transacao[];

  // Construtor: quando o gerenciador é criado, carrega as transações do LocalStorage
  constructor() {
    this.transacoes = [];
    this.carregarTransacoes();
  }

  // ========================
  // MÉTODOS DE CRUD (Criar, Ler, Atualizar, Deletar)
  // ========================

  // Adiciona uma nova transação ao array e salva no LocalStorage
  adicionarTransacao(
    descricao: string,
    valor: number,
    tipo: 'receita' | 'despesa',
    categoria: string,
    data: string
  ): Transacao {
    // Cria um novo objeto Transacao
    const novaTransacao = new Transacao(descricao, valor, tipo, categoria, data);

    // Adiciona no array
    this.transacoes.push(novaTransacao);

    // Salva no LocalStorage para não perder os dados
    this.salvarTransacoes();

    // Retorna a transação criada
    return novaTransacao;
  }

  // Remove uma transação pelo id
  removerTransacao(id: string): boolean {
    // Procura o índice da transação no array
    const indice = this.transacoes.findIndex(
      (transacao) => transacao.id === id
    );

    // Se não encontrou, retorna false
    if (indice === -1) {
      return false;
    }

    // Remove a transação do array usando splice
    // splice(indice, 1) = remove 1 elemento a partir do índice
    this.transacoes.splice(indice, 1);

    // Salva as alterações no LocalStorage
    this.salvarTransacoes();

    return true;
  }

  // Edita uma transação existente
  editarTransacao(
    id: string,
    descricao: string,
    valor: number,
    tipo: 'receita' | 'despesa',
    categoria: string,
    data: string
  ): boolean {
    // Procura a transação pelo id usando find
    const transacao = this.transacoes.find((t) => t.id === id);

    // Se não encontrou, retorna false
    if (!transacao) {
      return false;
    }

    // Atualiza os dados da transação
    transacao.descricao = descricao;
    transacao.valor = valor;
    transacao.tipo = tipo;
    transacao.categoria = categoria;
    transacao.data = data;

    // Salva as alterações
    this.salvarTransacoes();

    return true;
  }

  // Retorna todas as transações
  obterTransacoes(): Transacao[] {
    return this.transacoes;
  }

  // Busca uma transação pelo id
  buscarPorId(id: string): Transacao | undefined {
    return this.transacoes.find((t) => t.id === id);
  }

  // ========================
  // MÉTODOS DE CÁLCULO
  // ========================

  // Calcula o total de receitas usando reduce
  // reduce percorre todo o array e acumula um valor
  calcularTotalReceitas(): number {
    return this.transacoes
      .filter((t) => t.tipo === 'receita')
      .reduce((total, t) => total + t.valor, 0);
  }

  // Calcula o total de despesas usando filter e reduce
  calcularTotalDespesas(): number {
    return this.transacoes
      .filter((t) => t.tipo === 'despesa')
      .reduce((total, t) => total + t.valor, 0);
  }

  // Calcula o saldo (receitas - despesas)
  calcularSaldo(): number {
    return this.calcularTotalReceitas() - this.calcularTotalDespesas();
  }

  // Retorna a quantidade total de transações
  obterQuantidade(): number {
    return this.transacoes.length;
  }

  // ========================
  // MÉTODOS DE FILTRO E PESQUISA
  // ========================

  // Filtra transações por categoria
  filtrarPorCategoria(categoria: string): Transacao[] {
    // Se a categoria for "todas", retorna todas as transações
    if (categoria === 'todas') {
      return this.transacoes;
    }

    // filter cria um novo array apenas com os itens que passam na condição
    return this.transacoes.filter((t) => t.categoria === categoria);
  }

  // Filtra transações por tipo (receita ou despesa)
  filtrarPorTipo(tipo: string): Transacao[] {
    if (tipo === 'todos') {
      return this.transacoes;
    }

    return this.transacoes.filter((t) => t.tipo === tipo);
  }

  // Filtra transações por mês
  // O formato da data é "YYYY-MM-DD", então pegamos o mês com substring
  filtrarPorMes(mes: string): Transacao[] {
    if (mes === 'todos') {
      return this.transacoes;
    }

    return this.transacoes.filter((t) => {
      // Pega o mês da data (posição 5 e 6 do formato "YYYY-MM-DD")
      const mesTransacao = t.data.substring(0, 7); // "YYYY-MM"
      return mesTransacao === mes;
    });
  }

  // Pesquisa transações pela descrição
  pesquisarPorDescricao(termo: string): Transacao[] {
    // Se o termo estiver vazio, retorna todas
    if (termo.trim() === '') {
      return this.transacoes;
    }

    // Converte para minúsculo para comparar sem diferenciar maiúsculas/minúsculas
    const termoMinusculo = termo.toLowerCase();

    return this.transacoes.filter((t) =>
      t.descricao.toLowerCase().includes(termoMinusculo)
    );
  }

  // Aplica múltiplos filtros ao mesmo tempo
  filtrarTransacoes(
    categoria: string,
    tipo: string,
    mes: string,
    termo: string
  ): Transacao[] {
    // Começa com todas as transações
    let resultado = this.transacoes;

    // Aplica filtro de categoria se necessário
    if (categoria !== 'todas') {
      resultado = resultado.filter((t) => t.categoria === categoria);
    }

    // Aplica filtro de tipo se necessário
    if (tipo !== 'todos') {
      resultado = resultado.filter((t) => t.tipo === tipo);
    }

    // Aplica filtro de mês se necessário
    if (mes !== 'todos') {
      resultado = resultado.filter((t) => t.data.substring(0, 7) === mes);
    }

    // Aplica pesquisa por descrição se necessário
    if (termo.trim() !== '') {
      const termoMinusculo = termo.toLowerCase();
      resultado = resultado.filter((t) =>
        t.descricao.toLowerCase().includes(termoMinusculo)
      );
    }

    return resultado;
  }

  // Retorna todas as categorias únicas cadastradas
  obterCategorias(): string[] {
    // Cria um array com todas as categorias
    const categorias: string[] = [];

    // Percorre todas as transações
    for (const transacao of this.transacoes) {
      // Se a categoria ainda não está no array, adiciona
      if (!categorias.includes(transacao.categoria)) {
        categorias.push(transacao.categoria);
      }
    }

    return categorias;
  }

  // Retorna os meses disponíveis (que possuem transações)
  obterMesesDisponiveis(): string[] {
    const meses: string[] = [];

    for (const transacao of this.transacoes) {
      const mes = transacao.data.substring(0, 7); // "YYYY-MM"
      if (!meses.includes(mes)) {
        meses.push(mes);
      }
    }

    // Ordena os meses em ordem decrescente (mais recente primeiro)
    meses.sort((a, b) => b.localeCompare(a));

    return meses;
  }

  // ========================
  // MÉTODOS DE LOCALSTORAGE
  // ========================

  // Salva as transações no LocalStorage
  private salvarTransacoes(): void {
    // Converte os objetos Transacao para objetos simples (ITransacao)
    // para poder salvar como JSON
    const dados: ITransacao[] = this.transacoes.map((t) => ({
      id: t.id,
      descricao: t.descricao,
      valor: t.valor,
      tipo: t.tipo,
      categoria: t.categoria,
      data: t.data,
    }));

    salvarNoStorage('myfinance_transacoes', dados);
  }

  // Carrega as transações do LocalStorage
  private carregarTransacoes(): void {
    const dados = carregarDoStorage<ITransacao[]>('myfinance_transacoes');

    // Se existem dados salvos, recria os objetos Transacao
    if (dados) {
      this.transacoes = [];

      // Percorre os dados salvos e cria objetos Transacao
      for (const item of dados) {
        const transacao = new Transacao(
          item.descricao,
          item.valor,
          item.tipo,
          item.categoria,
          item.data,
          item.id
        );
        this.transacoes.push(transacao);
      }
    }
  }
}
