import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // In production /api/chat is a Vercel function; in dev the same handler
    // is mounted on the local Express server (server/server.js). Only the
    // chat route is proxied — the Admin page talks to :3001 directly.
    proxy: {
      "/api/chat": "http://localhost:3001",
    },
  },
  test: {
    globals: true,          // use describe/it/expect without imports
    environment: 'jsdom',   // simulates the DOM for component tests
    setupFiles: './src/test/setup.js',
  },
})