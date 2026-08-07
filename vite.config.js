import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages sirve los proyectos en https://<usuario>.github.io/<repo>/,
  // no en la raíz del dominio. En local (npm run dev / build normal) queda
  // en "/" como siempre; el build de producción para Pages define esta
  // variable en el workflow de GitHub Actions (ver .github/workflows/deploy.yml).
  base: process.env.GITHUB_PAGES ? '/Proyecto_Desarrollo_Web/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
