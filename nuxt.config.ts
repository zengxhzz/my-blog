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

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-dark',   // ← 关键:从 github-light 改成深色主题
            dark: 'github-dark',
          },
          langs: ['js', 'ts', 'vue', 'bash', 'json', 'html', 'css', 'md', 'python'],
        },
      },
    },
  },
})
