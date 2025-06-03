import { defineConfig } from 'vite'

export default defineConfig({
  // Базовая конфигурация Vite
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
        output: {
            manualChunks: undefined,
        }
    }
  },
  // Здесь можно добавить дополнительные настройки по мере необходимости
})