import { existsSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { figureDims } from './scripts/vite-plugin-figure-dims.mjs'

const ROOT = dirname(fileURLToPath(import.meta.url))
const SMART_HOME_MEDIA = resolve(ROOT, 'src/projects/smart-home-control/media')
const SMART_HOME_OPTIMIZED = resolve(SMART_HOME_MEDIA, '.optimized')

// The Smart Home project is intentionally evidence-heavy: its case study uses
// photographed paper-prototype screens, including several 0.5–1 MB JPEGs.
// Keep those originals as the archival masters, but resolve their imports to
// build-generated WebP delivery copies when available. No data-file duplication,
// and every consumer (inline figure, zoom, print) gets the same optimized URL.
function smartHomeOptimizedMedia() {
  return {
    name: 'smart-home-optimized-media',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer || !/\.(?:jpe?g|png)$/i.test(source)) return null

      const importerPath = importer.split('?')[0]
      const original = resolve(dirname(importerPath), source)
      const relativePath = relative(SMART_HOME_MEDIA, original)

      // Only touch assets inside this one case study. A path outside the media
      // root starts with ".."; leave every other project's imports untouched.
      if (
        !relativePath ||
        relativePath === '..' ||
        relativePath.startsWith(`..${sep}`)
      ) {
        return null
      }

      const optimized = resolve(
        SMART_HOME_OPTIMIZED,
        relativePath.replace(/\.(?:jpe?g|png)$/i, '.webp')
      )

      return existsSync(optimized) ? optimized : null
    },
  }
}

export default defineConfig({
  // smartHomeOptimizedMedia runs before Vite's asset plugin; figureDims runs
  // after it, so dimensions are registered from the actual WebP the browser
  // receives rather than from the heavier JPEG master.
  plugins: [smartHomeOptimizedMedia(), react(), figureDims()],
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
          // React first and with the highest priority: framer-motion imports
          // React, and without the explicit order Rolldown filed react and
          // its JSX runtime under the motion chunk — which put framer-motion
          // back on the homepage's critical path by the back door.
          groups: [
            { name: "react", priority: 30, test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
            { name: "motion", priority: 20, test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: "profile", priority: 10, test: /[\\/]src[\\/](data[\\/]|projects[\\/][^\\/]+[\\/]card\.js$)/ },
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