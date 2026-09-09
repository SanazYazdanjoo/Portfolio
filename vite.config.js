import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { figureDims } from './scripts/vite-plugin-figure-dims.mjs'

export default defineConfig({
  // figureDims: case-study figures get their pixel size registered against
  // their URL at build time, so SectionMedia can reserve each figure's box
  // before the lazy image loads (see the plugin's header comment).
  plugins: [react(), figureDims()],
  build: {
    rollupOptions: {
      output: {
        // Pin the chunk split instead of leaving it to the bundler's
        // heuristics, which folded the 170 KB profile-data chunk into the
        // entry the moment the shell overlays went lazy. Three long-lived
        // chunks — framework, profile content, app — so a copy edit no
        // longer invalidates React, and vice versa. Vite 8 bundles with
        // Rolldown, whose grouping API is advancedChunks.
        advancedChunks: {
          groups: [
            { name: "motion", test: /node_modules[\/]framer-motion[\/]/ },
            { name: "react", test: /node_modules[\/](react|react-dom|react-router|react-router-dom|scheduler)[\/]/ },
            { name: "profile", test: /[\/]src[\/](data[\/]|projects[\/][^\/]+[\/]card\.js$)/ },
          ],
        },
      },
    },
  },
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