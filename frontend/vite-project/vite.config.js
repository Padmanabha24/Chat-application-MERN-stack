import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'",
})
