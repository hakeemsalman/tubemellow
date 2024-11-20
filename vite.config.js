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
            'src/static/icon-128.png'
          ],
          dest: 'assets/'
        },
        {
          src: 'src/static/manifest.json',
          dest: '.'
        },
        {
          src: ['src/content_script.js', 'src/background.js'],
          dest: 'scripts/'
        }
      ]
    })
  ],
})
