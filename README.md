# 💰 MyFinance - Sistema de Finanças Pessoais

Sistema web para controle de finanças pessoais, desenvolvido como projeto acadêmico para as disciplinas de **Programação II** e **Construção de Sites**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

---

## 📌 Descrição

O **MyFinance** é um sistema simples e intuitivo para controle de finanças pessoais. Ele permite que o usuário registre suas receitas e despesas, visualize o saldo atual, filtre transações por categoria, tipo e mês, e tenha uma visão clara da sua saúde financeira.

O projeto foi pensado para resolver um problema real: **a falta de organização financeira**, que afeta muitas pessoas no dia a dia.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura das páginas |
| **CSS3** | Estilização e responsividade |
| **TypeScript** | Lógica da aplicação (tipagem estática) |
| **Vite** | Bundler e servidor de desenvolvimento |
| **LocalStorage** | Persistência de dados no navegador |
| **Git** | Controle de versão |
| **GitHub Pages** | Hospedagem do projeto |

---

## ✨ Funcionalidades

- ✅ Cadastro de **receitas** e **despesas**
- ✅ **Dashboard** com saldo, total de receitas, despesas e quantidade de lançamentos
- ✅ **Lista de transações** com edição e exclusão
- ✅ **Filtros** por categoria, tipo e mês
- ✅ **Pesquisa** por descrição
- ✅ **Resumo financeiro** com análise de gastos por categoria
- ✅ **Barra de progresso** de nível de gastos
- ✅ **Status financeiro** com indicador visual
- ✅ **Design responsivo** para mobile e desktop
- ✅ **Dados persistidos** no LocalStorage

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/myfinance.git

# 2. Acesse a pasta do projeto
cd myfinance

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

---

## 🌐 Como Publicar no GitHub Pages

```bash
# 1. Gere o build de produção
npm run build

# 2. Instale o gh-pages (se ainda não tiver)
npm install -D gh-pages

# 3. Adicione o script de deploy no package.json:
# "deploy": "gh-pages -d dist"

# 4. Publique
npm run deploy
```

Ou manualmente:

1. Faça o build com `npm run build`
2. Suba a pasta `dist/` para um branch chamado `gh-pages`
3. No GitHub, vá em **Settings > Pages** e selecione o branch `gh-pages`

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes da interface
│   ├── Navbar.ts        # Barra de navegação
│   ├── Dashboard.ts     # Cards do dashboard
│   ├── Formulario.ts    # Formulário de transações
│   ├── ListaTransacoes.ts # Tabela de histórico
│   ├── Filtros.ts       # Filtros e pesquisa
│   └── Resumo.ts        # Resumo financeiro
│
├── models/              # Modelos de dados (POO)
│   └── Transacao.ts     # Classe Transacao
│
├── services/            # Serviços (lógica de negócio)
│   ├── GerenciadorFinanceiro.ts  # Gerenciador de transações
│   └── StorageService.ts        # Funções do LocalStorage
│
├── utils/               # Utilitários
│   ├── formatadores.ts  # Funções de formatação
│   └── categorias.ts    # Arrays de categorias
│
├── styles/              # Estilos CSS
│   └── main.css         # Estilo principal
│
├── main.ts              # Arquivo principal (ponto de entrada)
└── vite-env.d.ts        # Declarações de tipo do Vite
```

### Explicação das pastas

| Pasta | Descrição |
|-------|-----------|
| `components/` | Cada arquivo cuida de uma parte da tela (navbar, formulário, tabela, etc.) |
| `models/` | Contém a classe `Transacao`, que define a estrutura dos dados |
| `services/` | Contém a lógica principal: gerenciar transações e salvar no LocalStorage |
| `utils/` | Funções auxiliares reutilizáveis (formatação, categorias) |
| `styles/` | Arquivo CSS com todos os estilos |

---

## 📚 Conceitos de Programação Utilizados

### Já conhecidos
- Funções
- Vetores (Arrays)
- Estruturas de Repetição (`for`, `for...of`)
- Estruturas Condicionais (`if`, `else`, `switch`)

### Novos
- Classes e Objetos (POO)
- Interfaces (TypeScript)
- Módulos (`import` / `export`)
- Manipulação do DOM
- Eventos
- LocalStorage
- Métodos de Array (`map`, `filter`, `reduce`, `find`, `some`, `includes`)
- TypeScript (Tipagem estática)

---

## 👤 Autor

Projeto acadêmico — Programação II + Construção de Sites.

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.
