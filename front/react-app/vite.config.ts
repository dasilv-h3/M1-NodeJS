import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // écouter sur toutes les adresses IP
    port: 5173,       // ou un autre port si nécessaire
    watch: {
      usePolling: true,  // nécessaire pour Windows, active le mode polling
    },
  },
});