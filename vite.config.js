import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // use describe/it/expect without imports
    environment: 'jsdom',   // simulates the DOM for component tests
    setupFiles: './src/test/setup.js',
  },
})