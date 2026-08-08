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
        main: resolve(import.meta.dirname, 'index.html'),
        ligaUniversitaria: resolve(import.meta.dirname, 'liga_universitaria.html'),
        ligaKids: resolve(import.meta.dirname, 'liga_kids.html'),
        ligaJuvenil: resolve(import.meta.dirname, 'liga_juvenil.html'),

        etapasEstaduais: resolve(import.meta.dirname, 'etapas-estaduais.html'),
        etapaNacional: resolve(import.meta.dirname, 'etapa_nacional.html'),
        etapaMundial: resolve(import.meta.dirname, 'etapa_mundial.html'),

        loja: resolve(import.meta.dirname, 'loja.html'),
        produto: resolve(import.meta.dirname, 'produto.html'),
        resultados: resolve(import.meta.dirname, 'resultados.html'),
      },
    },
  },
});