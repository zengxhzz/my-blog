<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  date: string
  tags?: string[]
  path: string
}>()

const tagList = computed(() => props.tags ?? [])
</script>

<template>
  <article>
    <NuxtLink :to="path" class="group block">
      <h2 class="text-lg font-medium leading-snug transition-colors group-hover:text-accent">
        {{ title }}
      </h2>

      <p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
        {{ description }}
      </p>

      <div class="mt-2.5 flex items-center gap-3 text-sm">
        <time :datetime="date" class="text-muted">
          {{ formatDate(date) }}
        </time>

        <ul v-if="tagList.length" class="flex flex-wrap gap-1.5">
          <li
            v-for="tag in tagList"
            :key="tag"
            class="rounded border border-border px-1.5 py-px font-mono text-xs text-muted"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </NuxtLink>
  </article>
</template>
