<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const route = useRoute()

const { data: post } = await useAsyncData(`post:${route.path}`, () =>
  queryCollection('blog')
    .path(route.path)
    .where('draft', '=', false)
    .first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在', fatal: true })
}

const { data: surround } = await useAsyncData(`surround:${route.path}`, () =>
  queryCollectionItemSurroundings('blog', route.path, {
    fields: ['title', 'path', 'date'],
  })
    .where('draft', '=', false)
    .order('date', 'ASC'),
)

const prevPost = computed(() => surround.value?.[0] ?? null) // 更早一篇
const nextPost = computed(() => surround.value?.[1] ?? null) // 更新一篇

const minutes = computed(() => readingTime(post.value?.body))

const toc = computed<TocLink[]>(() => {
  const body = post.value?.body as { toc?: { links?: TocLink[] } } | undefined
  return body?.toc?.links ?? []
})

const publishedIso = computed(() => {
  const d = new Date(post.value?.date ?? '')
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
})

useSeoMeta({
  title: () => post.value?.title ?? '',
  description: () => post.value?.description ?? '',
  ogType: 'article',
  articlePublishedTime: publishedIso.value,
})

defineOgImage('BlogPost', {
  title: post.value.title,
  description: post.value.description,
})
</script>

<template>
  <div v-if="post">
    <ReadingProgress />

    <div
      class="mx-auto w-full max-w-7xl px-5 py-10 sm:py-14 xl:grid xl:grid-cols-[1fr_minmax(0,46rem)_1fr] xl:gap-10"
    >
      <div class="hidden xl:block" aria-hidden="true" />

      <article class="mx-auto w-full max-w-[46rem]">
        <!-- 文章头部元信息 -->
        <header class="mb-10">
          <h1 class="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            {{ post.title }}
          </h1>
          <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-3">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span aria-hidden="true">·</span>
            <span>约 {{ minutes }} 分钟读完</span>
          </div>
          <ul v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-full bg-accent-soft px-2.5 py-1 text-xs text-ink-2"
            >
              #{{ tag }}
            </li>
          </ul>
          <hr class="mt-8 border-line/70" >
        </header>

        <!-- 移动端目录 -->
        <details
          v-if="toc.length"
          class="mb-8 rounded-card border border-line bg-surface-1 px-4 py-3 xl:hidden"
        >
          <summary class="cursor-pointer select-none text-sm font-medium text-ink-2">
            目录
          </summary>
          <div class="pt-3">
            <TocNav :links="toc" />
          </div>
        </details>

        <!-- 正文 -->
        <ContentRenderer :value="post" class="prose max-w-none" />

        <!-- 上一篇 / 下一篇 -->
        <nav
          v-if="prevPost || nextPost"
          class="mt-14 grid gap-3 border-t border-line/70 pt-8 sm:grid-cols-2"
          aria-label="相邻文章"
        >
          <NuxtLink
            v-if="prevPost"
            :to="prevPost.path"
            class="group rounded-card border border-line bg-surface-1 p-4 shadow-card transition hover:border-line-strong hover:shadow-card-hover"
          >
            <p class="text-xs text-ink-3">← 上一篇</p>
            <p class="mt-1 text-sm font-medium text-ink transition group-hover:text-accent-strong">
              {{ prevPost.title }}
            </p>
          </NuxtLink>
          <span v-else class="hidden sm:block" aria-hidden="true" />
          <NuxtLink
            v-if="nextPost"
            :to="nextPost.path"
            class="group rounded-card border border-line bg-surface-1 p-4 text-right shadow-card transition hover:border-line-strong hover:shadow-card-hover"
          >
            <p class="text-xs text-ink-3">下一篇 →</p>
            <p class="mt-1 text-sm font-medium text-ink transition group-hover:text-accent-strong">
              {{ nextPost.title }}
            </p>
          </NuxtLink>
        </nav>
      </article>

      <!-- 桌面端侧边目录 -->
      <aside v-if="toc.length" class="hidden xl:block">
        <div class="sticky top-24 max-w-56">
          <TocNav :links="toc" />
        </div>
      </aside>
      <div v-else class="hidden xl:block" aria-hidden="true" />
    </div>
  </div>
</template>
