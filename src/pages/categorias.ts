import { inicializarPagina } from './common';
import { categoriasDespesa, categoriasReceita } from '../utils/categorias';

inicializarPagina();

// Scripts "type=module" sempre aguardam o HTML carregar — não precisa de DOMContentLoaded
function mostrarCategorias() {
  const container = document.getElementById('lista-categorias-view');

  if (container === null) {
    return;
  }

  let html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';

  html += '<div><h3>⬇️ Despesas</h3><ul class="sobre-lista">';
  for (let i = 0; i < categoriasDespesa.length; i++) {
    html += '<li>' + categoriasDespesa[i] + '</li>';
  }
  html += '</ul></div>';

  html += '<div><h3>⬆️ Receitas</h3><ul class="sobre-lista">';
  for (let i = 0; i < categoriasReceita.length; i++) {
    html += '<li>' + categoriasReceita[i] + '</li>';
  }
  html += '</ul></div>';

  html += '</div>';
  container.innerHTML = html;
}

mostrarCategorias();
