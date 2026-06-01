import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        updated: z.string().optional(),
        category: z.string().optional(),
        featured: z.boolean().default(false),
        cover: z.string().optional(),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        tech: z.array(z.string()).default([]),
        url: z.string().url().optional(),
        repo: z.string().url().optional(),
        featured: z.boolean().default(false),
        year: z.number().optional(),
        status: z.enum(['active', 'archived', 'wip']).optional(),
      }),
    }),
  },

  nitro: {
    prerender: {
      crawlLinks: true,   // 自动顺着链接抓取所有文章页
      routes: ['/blog'],  // 入口路由
    },
  },
})
