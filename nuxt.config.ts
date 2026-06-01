import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/seo', '@nuxtjs/color-mode'],

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
          theme: 'github-dark',
          langs: ['js', 'ts', 'vue', 'bash', 'json', 'html', 'css', 'md', 'python'],
        },
      },
    },
  },

  colorMode: {
    classSuffix: '',      // <html class="dark"> ←关键
    preference: 'system', // 默认跟随系统
    fallback: 'light',    // 系统检测不到时用浅色
  },
})
