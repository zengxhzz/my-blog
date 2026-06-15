<script setup lang="ts">
useSeoMeta({
  title: '随笔',
  description: '日常随想,随手记录。',
})

const { data } = await useAsyncData('notes', () =>
  queryCollection('notes').first(),
)

interface NoteItem {
  date: string
  text: string
}

const notes = computed<NoteItem[]>(() => {
  const raw = (data.value as { notes?: NoteItem[] } | undefined)?.notes ?? []
  return [...raw].sort((a, b) => b.date.localeCompare(a.date))
})

const groups = computed(() => {
  const map = new Map<string, NoteItem[]>()
  for (const n of notes.value) {
    const year = (n.date ?? '').slice(0, 4) || '未注明'
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(n)
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]))
})
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-5 py-14 sm:py-20">
    <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">随笔</h1>
    <p class="mt-3 text-ink-2">日常随想,随手记录。</p>

    <div v-if="groups.length" class="mt-10 space-y-12">
      <section v-for="[year, list] in groups" :key="year">
        <h2 class="mb-4 font-mono text-sm font-medium tracking-wider text-ink-3">
          {{ year }}
        </h2>

        <ul class="relative space-y-5">
          <li v-for="n in list" :key="n.date" class="flex gap-4">
            <!-- 时间线列 -->
            <div class="flex flex-col items-center shrink-0">
              <span
                class="mt-1.5 size-2 rounded-full"
                style="background-color: color-mix(in srgb, currentColor 30%, transparent)"
              />
              <div
                class="w-px flex-1"
                style="background-color: color-mix(in srgb, currentColor 12%, transparent)"
              />
            </div>
            <!-- 内容列 -->
            <div class="pb-5">
              <time :datetime="n.date" class="text-sm opacity-60">
                {{ n.date }}
              </time>
              <p class="mt-1 leading-relaxed whitespace-pre-line">
                {{ n.text }}
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <p v-else class="mt-10 text-ink-3">还没有随笔。</p>
  </div>
</template>
