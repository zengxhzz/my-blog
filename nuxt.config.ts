import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://yourname.dev',
    name: 'yourname.',
  },

  app: {
    head: {
      titleTemplate: '%s · yourname.',
    },
  },

  ogImage: {
    zeroRuntime: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },
})
