// ============================================================
// Arquivo: Transacao.ts
// Descrição: Classe que representa uma transação financeira
// ============================================================

// Interface que define a estrutura de uma transação
// Interfaces ajudam a definir o "formato" dos dados
export interface ITransacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
}

// Classe Transacao - representa uma única transação (receita ou despesa)
// Usamos uma classe para organizar os dados e garantir que toda transação
// tenha os mesmos campos
export class Transacao {
  // Atributos da classe (as informações que cada transação possui)
  public id: string;
  public descricao: string;
  public valor: number;
  public tipo: 'receita' | 'despesa';
  public categoria: string;
  public data: string;

  // Construtor: é chamado quando criamos uma nova transação com "new Transacao(...)"
  // Ele recebe os dados e salva nos atributos do objeto
  constructor(
    descricao: string,
    valor: number,
    tipo: 'receita' | 'despesa',
    categoria: string,
    data: string,
    id?: string
  ) {
    // Se um id foi passado, usa ele; senão, gera um novo id único
    this.id = id || this.gerarId();
    this.descricao = descricao;
    this.valor = valor;
    this.tipo = tipo;
    this.categoria = categoria;
    this.data = data;
  }

  // Método privado para gerar um id único
  // Usa a data atual em milissegundos + um número aleatório
  private gerarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
}
