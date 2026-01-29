import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Proxy is handled by Axios instance base URL, but can be kept for other needs if any.
    // proxy: {
    //   '/api': 'http://localhost:5000'
    // }
  }
})
