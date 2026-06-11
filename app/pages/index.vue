<script setup lang="ts">
useHead({ title: 'k1sakityan.', titleTemplate: '%s' })
useSeoMeta({
  description: '记录开发、阅读与思考的个人博客。',
  ogTitle: 'k1sakityan.',
  ogDescription: '记录开发、阅读与思考的个人博客。',
})
defineOgImageComponent('BlogPost', {
  title: 'k1sakityan.',
  description: '记录开发、阅读与思考的个人博客',
})

const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
)

const recent = computed(() => (posts.value ?? []).slice(0, 6))
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-5">
    <!-- Hero -->
    <section class="pt-16 pb-12 sm:pt-24 sm:pb-16">
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">k1sakityan.</h1>
      <p class="mt-4 max-w-prose leading-relaxed text-ink-2">
        记录开发、阅读与日常思考的小站。写给自己,也写给恰好路过的你。
      </p>
      <div class="mt-7 flex items-center gap-3">
        <a
          href="https://github.com/zengxhzz"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface-1 px-4 text-sm text-ink-2 shadow-card transition hover:border-line-strong hover:text-ink hover:shadow-card-hover"
        >
          <svg viewBox="0 0 16 16" class="size-4 fill-current" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          GitHub
        </a>
        <a
          href="/rss.xml"
          class="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface-1 px-4 text-sm text-ink-2 shadow-card transition hover:border-line-strong hover:text-ink hover:shadow-card-hover"
        >
          <svg viewBox="0 0 24 24" class="size-4 fill-current" aria-hidden="true">
            <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56Zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9ZM6.18 15.64a2.18 2.18 0 1 0 0 4.36 2.18 2.18 0 0 0 0-4.36Z" />
          </svg>
          RSS
        </a>
      </div>
    </section>

    <!-- 最近文章 -->
    <section class="pb-20">
      <div class="mb-6 flex items-baseline justify-between">
        <h2 class="text-lg font-semibold">最近文章</h2>
        <NuxtLink
          to="/blog"
          class="text-sm text-accent-strong underline-offset-4 transition hover:underline"
        >
          全部文章 →
        </NuxtLink>
      </div>

      <ul v-if="recent.length" class="grid gap-4">
        <li v-for="p in recent" :key="p.path">
          <PostCard :post="p" />
        </li>
      </ul>
      <p v-else class="text-ink-3">还没有文章,敬请期待。</p>
    </section>
  </div>
</template>
