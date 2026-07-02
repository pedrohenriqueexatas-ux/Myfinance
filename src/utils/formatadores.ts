// ============================================================
// Arquivo: formatadores.ts
// Descrição: Funções utilitárias para formatar valores
// Essas funções são usadas em vários lugares do projeto
// ============================================================

// Formata um número para o formato de moeda brasileira (R$)
// Exemplo: 1500.50 -> "R$ 1.500,50"
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Formata uma data no formato "YYYY-MM-DD" para "DD/MM/YYYY"
// Exemplo: "2025-07-01" -> "01/07/2025"
export function formatarData(data: string): string {
  // Separa a data em partes usando o "-" como separador
  const partes = data.split('-');

  // partes[0] = ano, partes[1] = mês, partes[2] = dia
  const dia = partes[2];
  const mes = partes[1];
  const ano = partes[0];

  return `${dia}/${mes}/${ano}`;
}

// Retorna o nome do mês a partir do formato "YYYY-MM"
// Exemplo: "2025-07" -> "Julho 2025"
export function formatarMes(anoMes: string): string {
  // Array com os nomes dos meses
  const nomesMeses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  // Separa o ano e o mês
  const partes = anoMes.split('-');
  const ano = partes[0];
  // parseInt converte a string para número
  // Subtrai 1 porque o array começa no índice 0
  const indiceMes = parseInt(partes[1]) - 1;

  return `${nomesMeses[indiceMes]} ${ano}`;
}

// Capitaliza a primeira letra de uma string
// Exemplo: "alimentação" -> "Alimentação"
export function capitalizarPrimeiraLetra(texto: string): string {
  if (texto.length === 0) {
    return texto;
  }

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
