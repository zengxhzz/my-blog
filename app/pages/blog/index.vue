<script setup lang="ts">
useSeoMeta({
  title: '文章',
  description: '全部文章归档,按时间倒序排列。',
})
defineOgImageComponent('BlogPost', {
  title: '文章归档',
  description: 'k1sakityan. 的全部文章',
})

const { data: posts } = await useAsyncData('all-posts', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
)

type PostItem = NonNullable<typeof posts.value>[number]

const groups = computed(() => {
  const map = new Map<string, PostItem[]>()
  for (const p of posts.value ?? []) {
    const year = (p.date ?? '').slice(0, 4) || '未注明'
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(p)
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]))
})
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-5 py-14 sm:py-20">
    <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">文章</h1>
    <p class="mt-3 text-ink-2">共 {{ posts?.length ?? 0 }} 篇,按时间倒序。</p>

    <div v-if="groups.length" class="mt-10 space-y-12">
      <section v-for="[year, list] in groups" :key="year">
        <h2 class="mb-4 font-mono text-sm font-medium tracking-wider text-ink-3">
          {{ year }}
        </h2>
        <ul class="grid gap-4">
          <li v-for="p in list" :key="p.path">
            <PostCard :post="p" />
          </li>
        </ul>
      </section>
    </div>
    <p v-else class="mt-10 text-ink-3">还没有文章。</p>
  </div>
</template>
