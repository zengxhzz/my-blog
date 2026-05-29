<script setup lang="ts">
defineProps<{
  date: string
  tags?: string[]
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 text-sm">
    <time :datetime="date" class="text-muted">
      {{ formatDate(date) }}
    </time>

    <span v-if="tags?.length" class="flex flex-wrap gap-1.5">
      <span
        v-for="tag in tags"
        :key="tag"
        class="rounded border border-border px-1.5 py-px font-mono text-xs text-muted"
      >
        {{ tag }}
      </span>
    </span>
  </div>
</template>
