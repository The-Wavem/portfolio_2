import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      "@components": '/src/components',
      "@section": '/src/section',
      "@pages": '/src/pages',
      "@theme": '/src/theme',
      "@assets": '/src/assets',
    },
  },
  build: {
    // Aumentamos o limite do aviso para 1MB (já que usamos libs pesadas como MUI)
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Ao invés de uma função complexa, passamos um objeto simples.
        // O Vite é inteligente e vai separar apenas o que mandarmos, 
        // e fará a limpeza automática (tree-shaking) do resto, como os ícones.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'vendor-motion': ['framer-motion']
        }
      }
    }
  }
})
