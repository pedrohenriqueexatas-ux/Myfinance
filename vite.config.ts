import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Define a base como './' para funcionar no GitHub Pages (caminhos relativos)
  base: './',
  build: {
    // Diretório de saída do build
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        novaTransacao: resolve(__dirname, 'nova-transacao.html'),
        historico: resolve(__dirname, 'historico.html'),
        resumo: resolve(__dirname, 'resumo.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        categorias: resolve(__dirname, 'categorias.html'),
        metas: resolve(__dirname, 'metas.html'),
        educacao: resolve(__dirname, 'educacao.html'),
        contato: resolve(__dirname, 'contato.html'),
      }
    }
  },
});
