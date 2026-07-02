import { defineConfig } from 'vite';

// Configuração do Vite para o projeto MyFinance
export default defineConfig({
  // base define o caminho base para o GitHub Pages
  base: './',
  // Pasta de saída do build
  build: {
    outDir: 'dist',
  },
});
