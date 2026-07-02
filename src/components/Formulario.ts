// ============================================================
// Arquivo: Formulario.ts
// Descrição: Componente do formulário de nova transação
// Controla a criação e edição de transações
// ============================================================

import { GerenciadorFinanceiro } from '../services/GerenciadorFinanceiro';
import { obterCategoriasPorTipo } from '../utils/categorias';
import { navegarParaSecao } from './Navbar';

// Variável para guardar o id da transação sendo editada
// Se for null, significa que estamos criando uma nova transação
let idEdicao: string | null = null;

// Função que inicializa o formulário
// Adiciona os eventos nos campos e no botão de submit
export function inicializarFormulario(
  gerenciador: GerenciadorFinanceiro,
  atualizarTela: () => void
): void {
  const formulario = document.getElementById('form-transacao') as HTMLFormElement;
  const selectTipo = document.getElementById('campo-tipo') as HTMLSelectElement;

  // Quando o tipo mudar, atualiza as categorias disponíveis
  if (selectTipo) {
    selectTipo.addEventListener('change', () => {
      atualizarCategorias(selectTipo.value);
    });
  }

  // Quando o formulário for enviado
  if (formulario) {
    formulario.addEventListener('submit', (evento) => {
      // Previne o comportamento padrão (recarregar a página)
      evento.preventDefault();

      // Coleta os dados do formulário
      const dados = coletarDadosFormulario();

      // Verifica se os dados são válidos
      if (!dados) {
        return;
      }

      // Se temos um id de edição, estamos editando
      if (idEdicao) {
        gerenciador.editarTransacao(
          idEdicao,
          dados.descricao,
          dados.valor,
          dados.tipo,
          dados.categoria,
          dados.data
        );

        // Mostra mensagem de sucesso
        mostrarMensagem('Transação atualizada com sucesso!', 'sucesso');

        // Limpa o id de edição
        idEdicao = null;

        // Atualiza o título do formulário
        atualizarTituloFormulario('Nova Transação');
      } else {
        // Senão, estamos criando uma nova
        gerenciador.adicionarTransacao(
          dados.descricao,
          dados.valor,
          dados.tipo,
          dados.categoria,
          dados.data
        );

        // Mostra mensagem de sucesso
        mostrarMensagem('Transação adicionada com sucesso!', 'sucesso');
      }

      // Limpa o formulário
      formulario.reset();

      // Atualiza a tela (dashboard, lista, etc.)
      atualizarTela();

      // Navega para o dashboard
      navegarParaSecao('dashboard');
    });
  }

  // Inicializa as categorias com o tipo padrão
  atualizarCategorias('despesa');

  // Configura o botão de cancelar edição
  const botaoCancelar = document.getElementById('btn-cancelar');
  if (botaoCancelar) {
    botaoCancelar.addEventListener('click', () => {
      cancelarEdicao(formulario);
      atualizarTela();
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
  // Pega os valores dos campos
  const descricao = (
    document.getElementById('campo-descricao') as HTMLInputElement
  ).value.trim();
  const valorTexto = (
    document.getElementById('campo-valor') as HTMLInputElement
  ).value;
  const tipo = (document.getElementById('campo-tipo') as HTMLSelectElement)
    .value as 'receita' | 'despesa';
  const categoria = (
    document.getElementById('campo-categoria') as HTMLSelectElement
  ).value;
  const data = (document.getElementById('campo-data') as HTMLInputElement)
    .value;

  // Converte o valor para número
  const valor = parseFloat(valorTexto);

  // Validações simples
  if (descricao === '') {
    mostrarMensagem('Por favor, preencha a descrição.', 'erro');
    return null;
  }

  if (isNaN(valor) || valor <= 0) {
    mostrarMensagem('Por favor, insira um valor válido.', 'erro');
    return null;
  }

  if (categoria === '') {
    mostrarMensagem('Por favor, selecione uma categoria.', 'erro');
    return null;
  }

  if (data === '') {
    mostrarMensagem('Por favor, selecione uma data.', 'erro');
    return null;
  }

  return { descricao, valor, tipo, categoria, data };
}

// Atualiza as opções de categoria de acordo com o tipo selecionado
function atualizarCategorias(tipo: string): void {
  const selectCategoria = document.getElementById(
    'campo-categoria'
  ) as HTMLSelectElement;

  if (!selectCategoria) return;

  // Limpa as opções atuais
  selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';

  // Pega as categorias para o tipo selecionado
  const categorias = obterCategoriasPorTipo(tipo);

  // Cria uma opção para cada categoria
  for (const categoria of categorias) {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    selectCategoria.appendChild(option);
  }
}

// Preenche o formulário com os dados de uma transação para edição
export function preencherFormularioParaEdicao(
  id: string,
  gerenciador: GerenciadorFinanceiro
): void {
  // Busca a transação pelo id
  const transacao = gerenciador.buscarPorId(id);

  if (!transacao) return;

  // Salva o id para saber que estamos editando
  idEdicao = id;

  // Preenche os campos do formulário
  (document.getElementById('campo-descricao') as HTMLInputElement).value =
    transacao.descricao;
  (document.getElementById('campo-valor') as HTMLInputElement).value =
    transacao.valor.toString();
  (document.getElementById('campo-tipo') as HTMLSelectElement).value =
    transacao.tipo;

  // Atualiza as categorias antes de selecionar
  atualizarCategorias(transacao.tipo);

  (document.getElementById('campo-categoria') as HTMLSelectElement).value =
    transacao.categoria;
  (document.getElementById('campo-data') as HTMLInputElement).value =
    transacao.data;

  // Atualiza o título do formulário
  atualizarTituloFormulario('Editar Transação');

  // Mostra o botão de cancelar
  const botaoCancelar = document.getElementById('btn-cancelar');
  if (botaoCancelar) {
    botaoCancelar.style.display = 'inline-block';
  }

  // Navega para a seção do formulário
  navegarParaSecao('nova-transacao');
}

// Cancela a edição e limpa o formulário
function cancelarEdicao(formulario: HTMLFormElement): void {
  idEdicao = null;
  formulario.reset();
  atualizarTituloFormulario('Nova Transação');

  const botaoCancelar = document.getElementById('btn-cancelar');
  if (botaoCancelar) {
    botaoCancelar.style.display = 'none';
  }
}

// Atualiza o título do formulário
function atualizarTituloFormulario(titulo: string): void {
  const tituloElemento = document.getElementById('titulo-formulario');
  if (tituloElemento) {
    tituloElemento.textContent = titulo;
  }

  // Atualiza o texto do botão de submit
  const botaoSubmit = document.getElementById('btn-salvar');
  if (botaoSubmit) {
    if (titulo === 'Editar Transação') {
      botaoSubmit.textContent = 'Atualizar';
    } else {
      botaoSubmit.textContent = 'Adicionar';
    }
  }

  // Mostra ou esconde o botão cancelar
  const botaoCancelar = document.getElementById('btn-cancelar');
  if (botaoCancelar) {
    if (titulo === 'Editar Transação') {
      botaoCancelar.style.display = 'inline-block';
    } else {
      botaoCancelar.style.display = 'none';
    }
  }
}

// Mostra uma mensagem temporária para o usuário
export function mostrarMensagem(
  texto: string,
  tipo: 'sucesso' | 'erro'
): void {
  // Busca ou cria o elemento de mensagem
  let mensagemEl = document.getElementById('mensagem-feedback');

  if (!mensagemEl) {
    mensagemEl = document.createElement('div');
    mensagemEl.id = 'mensagem-feedback';
    document.body.appendChild(mensagemEl);
  }

  // Define o texto e a classe
  mensagemEl.textContent = texto;
  mensagemEl.className = 'mensagem-feedback';

  if (tipo === 'sucesso') {
    mensagemEl.classList.add('mensagem-sucesso');
  } else {
    mensagemEl.classList.add('mensagem-erro');
  }

  // Mostra a mensagem
  mensagemEl.classList.add('mensagem-visivel');

  // Remove a mensagem depois de 3 segundos
  setTimeout(() => {
    mensagemEl.classList.remove('mensagem-visivel');
  }, 3000);
}
