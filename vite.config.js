import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Necessary to listen on all interfaces
    // Add the Replit domain to allowedHosts
    allowedHosts: ['.replit.dev'] // Allows any subdomain of replit.dev
  }
})