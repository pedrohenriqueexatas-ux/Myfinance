// ============================================================
// Arquivo: Formulario.ts
// Descrição: Componente do formulário de nova transação
// Controla a criação e edição de transações
// ============================================================

import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { obterCategoriasPorTipo } from '../utils/categorias';

// Função que inicializa o formulário
export function inicializarFormulario(
  gerenciador: GerenciadorFinanceiro,
  atualizarTela: () => void
): void {
  const formulario = document.getElementById('form-transacao') as HTMLFormElement;
  const selectTipo = document.getElementById('campo-tipo') as HTMLSelectElement;

  // Verifica se estamos no modo de edição pela URL (MPA)
  const urlParams = new URLSearchParams(window.location.search);
  const idEdicao = urlParams.get('id');

  if (idEdicao) {
    preencherFormularioParaEdicao(idEdicao, gerenciador);
  } else {
    atualizarCategorias('despesa'); // Padrão
  }

  // Quando o tipo mudar, atualiza as categorias disponíveis
  if (selectTipo) {
    selectTipo.addEventListener('change', () => {
      atualizarCategorias(selectTipo.value);
    });
  }

  // Quando o formulário for enviado
  if (formulario) {
    formulario.addEventListener('submit', (evento) => {
      // Previne o comportamento padrão
      evento.preventDefault();

      // Coleta os dados do formulário
      const dados = coletarDadosFormulario();
      if (!dados) return;

      // Se temos um id de edição na URL, estamos editando
      if (idEdicao) {
        gerenciador.editarTransacao(
          idEdicao,
          dados.descricao,
          dados.valor,
          dados.tipo,
          dados.categoria,
          dados.data
        );
        mostrarMensagem('Transação atualizada com sucesso!', 'sucesso');
      } else {
        // Senão, estamos criando uma nova
        gerenciador.adicionarTransacao(
          dados.descricao,
          dados.valor,
          dados.tipo,
          dados.categoria,
          dados.data
        );
        mostrarMensagem('Transação adicionada com sucesso!', 'sucesso');
      }

      formulario.reset();
      atualizarTela();
    });
  }

  // Configura o botão de cancelar edição
  const botaoCancelar = document.getElementById('btn-cancelar');
  if (botaoCancelar) {
    botaoCancelar.addEventListener('click', () => {
      window.location.href = 'historico.html';
    });
  }
}

// Coleta os dados do formulário e valida
function coletarDadosFormulario(): {
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
} | null {
  const descricao = (document.getElementById('campo-descricao') as HTMLInputElement).value.trim();
  const valorTexto = (document.getElementById('campo-valor') as HTMLInputElement).value;
  const tipo = (document.getElementById('campo-tipo') as HTMLSelectElement).value as 'receita' | 'despesa';
  const categoria = (document.getElementById('campo-categoria') as HTMLSelectElement).value;
  const data = (document.getElementById('campo-data') as HTMLInputElement).value;

  const valor = parseFloat(valorTexto);

  if (descricao === '') { mostrarMensagem('Por favor, preencha a descrição.', 'erro'); return null; }
  if (isNaN(valor) || valor <= 0) { mostrarMensagem('Por favor, insira um valor válido.', 'erro'); return null; }
  if (categoria === '') { mostrarMensagem('Por favor, selecione uma categoria.', 'erro'); return null; }
  if (data === '') { mostrarMensagem('Por favor, selecione uma data.', 'erro'); return null; }

  return { descricao, valor, tipo, categoria, data };
}

// Atualiza as opções de categoria
function atualizarCategorias(tipo: string): void {
  const selectCategoria = document.getElementById('campo-categoria') as HTMLSelectElement;
  if (!selectCategoria) return;

  selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';
  const categorias = obterCategoriasPorTipo(tipo);
  for (const categoria of categorias) {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    selectCategoria.appendChild(option);
  }
}

// Preenche o formulário para edição
function preencherFormularioParaEdicao(
  id: string,
  gerenciador: GerenciadorFinanceiro
): void {
  const transacao = gerenciador.buscarPorId(id);
  if (!transacao) return;

  (document.getElementById('campo-descricao') as HTMLInputElement).value = transacao.descricao;
  (document.getElementById('campo-valor') as HTMLInputElement).value = transacao.valor.toString();
  (document.getElementById('campo-tipo') as HTMLSelectElement).value = transacao.tipo;
  
  atualizarCategorias(transacao.tipo);
  
  (document.getElementById('campo-categoria') as HTMLSelectElement).value = transacao.categoria;
  (document.getElementById('campo-data') as HTMLInputElement).value = transacao.data;

  atualizarTituloFormulario('Editar Transação');
}

function atualizarTituloFormulario(titulo: string): void {
  const tituloElemento = document.getElementById('titulo-formulario');
  if (tituloElemento) tituloElemento.textContent = titulo;

  const botaoSubmit = document.getElementById('btn-salvar');
  if (botaoSubmit) {
    botaoSubmit.textContent = titulo === 'Editar Transação' ? 'Atualizar' : 'Adicionar';
  }

  const botaoCancelar = document.getElementById('btn-cancelar');
  if (botaoCancelar) {
    botaoCancelar.style.display = titulo === 'Editar Transação' ? 'inline-block' : 'none';
  }
}

export function mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
  let mensagemEl = document.getElementById('mensagem-feedback');
  if (!mensagemEl) {
    mensagemEl = document.createElement('div');
    mensagemEl.id = 'mensagem-feedback';
    document.body.appendChild(mensagemEl);
  }

  mensagemEl.textContent = texto;
  mensagemEl.className = 'mensagem-feedback';
  if (tipo === 'sucesso') mensagemEl.classList.add('mensagem-sucesso');
  else mensagemEl.classList.add('mensagem-erro');
  
  mensagemEl.classList.add('mensagem-visivel');
  setTimeout(() => {
    mensagemEl.classList.remove('mensagem-visivel');
  }, 3000);
}
