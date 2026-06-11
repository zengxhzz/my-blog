<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{ links: TocLink[] }>()

const activeId = ref('')
let observer: IntersectionObserver | null = null

function flatten(links: TocLink[]): string[] {
  return links.flatMap(l => [l.id, ...(l.children ? flatten(l.children) : [])])
}

onMounted(() => {
  const ids = flatten(props.links)
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
  )
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav aria-label="文章目录">
    <p class="mb-3 hidden text-xs font-medium uppercase tracking-wider text-ink-3 xl:block">
      目录
    </p>
    <ul class="space-y-1 text-sm">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="block rounded px-2 py-1 leading-relaxed transition"
          :class="activeId === link.id
            ? 'bg-accent-soft font-medium text-accent-strong'
            : 'text-ink-3 hover:text-ink'"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children?.length" class="mt-1 space-y-1 pl-3">
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              class="block rounded px-2 py-1 leading-relaxed transition"
              :class="activeId === child.id
                ? 'bg-accent-soft font-medium text-accent-strong'
                : 'text-ink-3 hover:text-ink'"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
