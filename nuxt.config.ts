// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2025-03-28',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  plugins: [
    '~/plugins/dark-mode.client.ts'
  ],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/typography.css',
    '~/assets/css/animations.css'
  ],
  app: {
    head: {
      title: 'InfoJet - Analyseur de Newsletter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon.svg' },
        { rel: 'alternate icon', href: '/favicon.ico' }
      ]
    },
    baseURL: '/'
  },
  nitro: {
    output: {
      dir: 'dist',
      publicDir: 'dist'
    }
  }
})
