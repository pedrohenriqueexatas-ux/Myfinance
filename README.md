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

O deploy deste projeto está **automatizado** com o **GitHub Actions**.

Basta fazer um "push" para a branch `main`. O GitHub Actions cuidará do build usando o Vite e publicará as 9 páginas automaticamente no GitHub Pages, garantindo que todo o CSS e JavaScript funcionem perfeitamente.

---

## 📁 Estrutura do Projeto

O projeto utiliza a arquitetura de Múltiplas Páginas (MPA), sendo composto por 9 arquivos HTML principais.

```
/
├── index.html           # Dashboard (Visão Geral)
├── nova-transacao.html  # Formulário de Cadastro
├── historico.html       # Tabela de Transações
├── resumo.html          # Análise Financeira
├── sobre.html           # Sobre o Projeto
├── categorias.html      # Gerenciamento de Categorias
├── metas.html           # Metas Financeiras
├── educacao.html        # Dicas de Educação Financeira
├── contato.html         # Formulário de Contato
├── .github/workflows/
│   └── deploy.yml       # Script de Deploy Automático
├── src/
│   ├── pages/           # Scripts de inicialização de cada página
│   ├── components/      # Componentes da interface e lógica de UI
│   ├── models/          # Modelos de dados (POO)
│   ├── services/        # Serviços (lógica de negócio e LocalStorage)
│   ├── utils/           # Utilitários (formatação e categorias)
│   └── styles/          # Estilos CSS principais (main.css)
```

### Explicação das pastas

| Pasta | Descrição |
|-------|-----------|
| `src/pages/` | Arquivos TypeScript específicos para inicializar cada uma das 9 páginas. |
| `src/components/` | Cada arquivo cuida de uma parte lógica da tela (navbar, formulário, tabela). |
| `src/models/` | Contém a classe `Transacao`, que define a estrutura dos dados. |
| `src/services/` | Contém a lógica principal: gerenciar transações e salvar no LocalStorage. |
| `src/utils/` | Funções auxiliares reutilizáveis (formatação, categorias). |
| `src/styles/` | Arquivo CSS com todos os estilos, com paleta de cores aprimorada. |

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
