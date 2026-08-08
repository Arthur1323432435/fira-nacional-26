import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    injectHTML()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ligaUniversitaria: resolve(__dirname, 'liga_universitaria.html'),
        ligaKids: resolve(__dirname, 'liga_kids.html'),
        ligaJuvenil: resolve(__dirname, 'liga_juvenil.html'),

        etapasEstaduais: resolve(__dirname, 'etapas-estaduais.html'),
        etapaNacionail: resolve(__dirname, 'etapa_nacional.html'),
        etapaMundial: resolve(__dirname, 'etapa_mundial.html'),

        loja: resolve(__dirname, 'loja.html'),
        produto: resolve(__dirname, 'produto.html'),
        resultados: resolve(__dirname, 'resultados.html'),
      },
    },
  },
});