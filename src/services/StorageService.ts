// ============================================================
// Arquivo: StorageService.ts
// Descrição: Funções para salvar e carregar dados no LocalStorage
// O LocalStorage é como uma "memória" do navegador que persiste
// mesmo quando a página é fechada
// ============================================================

// Salva dados no LocalStorage
// Recebe uma chave (nome) e os dados a serem salvos
export function salvarNoStorage<T>(chave: string, dados: T): void {
  // JSON.stringify converte o objeto/array em uma string
  // porque o LocalStorage só aceita strings
  const dadosString = JSON.stringify(dados);

  // Salva no LocalStorage com a chave informada
  localStorage.setItem(chave, dadosString);
}

// Carrega dados do LocalStorage
// Recebe a chave e retorna os dados ou null se não existir
export function carregarDoStorage<T>(chave: string): T | null {
  // Busca os dados pela chave
  const dadosString = localStorage.getItem(chave);

  // Se não encontrou, retorna null
  if (dadosString === null) {
    return null;
  }

  // JSON.parse converte a string de volta para objeto/array
  const dados: T = JSON.parse(dadosString);

  return dados;
}

// Remove dados do LocalStorage pela chave
export function removerDoStorage(chave: string): void {
  localStorage.removeItem(chave);
}
