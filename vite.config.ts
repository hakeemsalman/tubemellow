import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: [
            'src/static/icon-16.png',
            'src/static/icon-32.png',
            'src/static/icon-48.png',
            'src/static/icon-128.png',
            'src/static/icon-16-disabled.png'
          ],
          dest: 'assets/'
        },
        {
          src: ['src/static/manifest.json'],
          dest: '.'
        }
      ]
    }),
  ],
  define: {
    'global': {},
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'src/scripts/background.tsx',
        content_script: 'src/scripts/content_script.tsx'
      },
      output: {
        entryFileNames: '[name].js'
      },
    },
    minify: 'terser',
    terserOptions: {
      // Terser configuration for background and content scripts
      compress: {
        drop_console: true,
        dead_code: true
      },
      mangle: true,
    }
  },
})
