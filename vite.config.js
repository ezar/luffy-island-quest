import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/luffy-island-quest/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Luffy Island Quest',
        short_name: 'LuffyQuest',
        description: 'One Piece — La Gran Aventura del Sombrero de Paja',
        theme_color: '#0A2240',
        background_color: '#0A2240',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/luffy-island-quest/',
        icons: [
          { src: '/luffy-island-quest/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}']
      }
    })
  ],
})

