import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },

  esbuild: {
    target: 'es2020'
  },

  server:{
    host: true,
    port: 3000,
    cors: true,
    open: true,
  }
})
