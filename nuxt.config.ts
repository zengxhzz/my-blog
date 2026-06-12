import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/color-mode', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://my-blog.zengxhzz.workers.dev',
    name: 'k1sakityan.',
    description: '记录开发、阅读与思考的个人博客。',
    defaultLocale: 'zh-CN',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      titleTemplate: '%s · k1sakityan.',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'k1sakityan. RSS', href: '/rss.xml' },
      ],
      meta: [
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#E6F7FF' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0C1722' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // 明暗模式:class 策略(html 上挂 .dark),模块在首屏前注入脚本,无 FOUC
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'k1sakityan-color-mode',
  },

  ogImage: {
    zeroRuntime: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', '/rss.xml'],
    },
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
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          // 明暗双主题:亮色 github-light,暗色 github-dark,CSS 变量切换
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['js', 'ts', 'vue', 'bash', 'json', 'html', 'css', 'md', 'python'],
        },
      },
    },
  },
})
