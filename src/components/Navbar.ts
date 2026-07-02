// ============================================================
// Arquivo: Navbar.ts
// Descrição: Componente da barra de navegação
// Controla qual seção está visível na tela
// ============================================================

// Função que inicializa a navegação
// Adiciona os eventos de clique nos links do menu
export function inicializarNavbar(): void {
  // Seleciona todos os links da navbar
  const links = document.querySelectorAll('.nav-link');

  // Adiciona um evento de clique em cada link
  for (const link of links) {
    link.addEventListener('click', (evento) => {
      // Previne o comportamento padrão do link (não recarregar a página)
      evento.preventDefault();

      // Pega o id da seção que o link aponta (do atributo data-secao)
      const secaoId = (link as HTMLElement).getAttribute('data-secao');

      // Se tem um id válido, navega para essa seção
      if (secaoId) {
        navegarParaSecao(secaoId);
      }
    });
  }

  // Inicializa o botão do menu mobile (hamburger)
  inicializarMenuMobile();
}

// Função que mostra uma seção e esconde as outras
export function navegarParaSecao(secaoId: string): void {
  // Seleciona todas as seções
  const secoes = document.querySelectorAll('.secao');

  // Percorre todas as seções
  for (const secao of secoes) {
    // Se é a seção que queremos mostrar, adiciona a classe "ativa"
    if (secao.id === secaoId) {
      secao.classList.add('secao-ativa');
    } else {
      // Senão, remove a classe "ativa" (esconde)
      secao.classList.remove('secao-ativa');
    }
  }

  // Atualiza o link ativo na navbar
  atualizarLinkAtivo(secaoId);

  // Fecha o menu mobile se estiver aberto
  fecharMenuMobile();

  // Rola a página para o topo
  window.scrollTo(0, 0);
}

// Atualiza visualmente qual link está ativo na navbar
function atualizarLinkAtivo(secaoId: string): void {
  const links = document.querySelectorAll('.nav-link');

  for (const link of links) {
    // Verifica se o link aponta para a seção ativa
    if ((link as HTMLElement).getAttribute('data-secao') === secaoId) {
      link.classList.add('nav-link-ativo');
    } else {
      link.classList.remove('nav-link-ativo');
    }
  }
}

// Inicializa o botão hamburger para telas pequenas
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

// Fecha o menu mobile
function fecharMenuMobile(): void {
  const navLinks = document.getElementById('nav-links');
  const botaoMenu = document.getElementById('botao-menu');

  if (navLinks && botaoMenu) {
    navLinks.classList.remove('nav-aberto');
    botaoMenu.classList.remove('menu-ativo');
  }
}
