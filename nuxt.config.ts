// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
    // Désactivation temporaire du module i18n pour résoudre les problèmes de chargement
    // '@nuxtjs/i18n'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'InfoJet - Analyseur de Newsletter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        // Favicon SVG moderne pour les navigateurs compatibles
        { 
          rel: 'icon', 
          type: 'image/svg+xml', 
          href: '/icons/favicon.svg' 
        },
        // Favicon ICO pour la compatibilité avec les navigateurs plus anciens
        { 
          rel: 'alternate icon', 
          href: '/favicon.ico' 
        }
      ]
    }
  },
  debug: true,
  vite: {
    define: {
      'process.env.DEBUG': 'true'
    }
  }
})
