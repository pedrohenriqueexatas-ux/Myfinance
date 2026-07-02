import { inicializarNavbar } from '../components/Navbar';

// Inicializa componentes comuns a todas as páginas
export function inicializarPagina(): void {
  document.addEventListener('DOMContentLoaded', () => {
    inicializarNavbar();
  });
}
