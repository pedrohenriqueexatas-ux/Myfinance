// ============================================================
// Arquivo: Navbar.ts
// Descrição: Componente da barra de navegação
// Controla o menu mobile e marca o link ativo
// ============================================================

export function inicializarNavbar(): void {
  // Inicializa o botão do menu mobile (hamburger)
  inicializarMenuMobile();
  
  // Destaca o link ativo baseado na URL atual
  destacarLinkAtivo();
}

function inicializarMenuMobile(): void {
  const botaoMenu = document.getElementById('botao-menu');
  const navLinks = document.getElementById('nav-links');

  if (botaoMenu && navLinks) {
    botaoMenu.addEventListener('click', () => {
      navLinks.classList.toggle('nav-aberto');
      botaoMenu.classList.toggle('menu-ativo');
    });
  }
}

function destacarLinkAtivo(): void {
  const links = document.querySelectorAll('.nav-link');
  // Pega o nome do arquivo atual da URL (ex: "historico.html")
  let paginaAtual = window.location.pathname.split('/').pop();
  
  // Se estiver na raiz ou vazio, considera index.html
  if (!paginaAtual || paginaAtual === '') {
    paginaAtual = 'index.html';
  }

  for (const link of links) {
    const href = link.getAttribute('href');
    if (href === paginaAtual || href === `./${paginaAtual}`) {
      link.classList.add('nav-link-ativo');
    } else {
      link.classList.remove('nav-link-ativo');
    }
  }
}
