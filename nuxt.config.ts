import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://my-blog.zengxhzz.workers.dev',
    name: 'k1sakityan.',
  },

  app: {
    head: {
      titleTemplate: '%s · k1sakityan.',
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
      ],
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
